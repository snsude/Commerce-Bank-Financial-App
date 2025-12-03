from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
import logging
from sqlalchemy import func
from database import get_db
from models.user import User
from models.auth_credentials import AuthCredentials
from models.profiles import Profile
from models.role import Role
from security.hashing import hash_password, verify_password
from security.jwt_utils import create_access_token
from core.dependencies import get_current_user
from schemas.user import UserCreate, UserOut, UserLogin
from schemas.auth import LoginResponse  # Import new schema

router = APIRouter(tags=["Authentication"])
logger = logging.getLogger(__name__)


@router.post("/register", response_model=LoginResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Register endpoint - handles all three user types
    """
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == payload.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        admin_id = None
        business_id = payload.business_id  # Get business_id from payload
        
        # Determine role based on admin_email
        if payload.admin_email:
            # User is joining a business account - look up admin by email
            admin_user = db.query(User).filter(User.email == payload.admin_email).first()
            if not admin_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Admin email not found"
                )
            
            # Get business_subuser role
            role = db.query(Role).filter(Role.role_name == 'business_subuser').first()
            if not role:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Sub-user role not found in database"
                )
            role_id = role.id
            admin_id = admin_user.id
            business_id = admin_user.business_id  # Inherit business_id from admin
            
        else:
            # No admin_email - check if business account or personal
            if business_id:
                # Business admin
                role = db.query(Role).filter(Role.role_name == 'business_admin').first()
            else:
                # Personal user
                role = db.query(Role).filter(Role.role_name == 'personal_user').first()
            
            if not role:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Role not found in database"
                )
            
            role_id = role.id

        # Create User
        new_user = User(
            email=payload.email,
            role_id=role_id,
            business_id=business_id,
            admin_id=admin_id
        )
        db.add(new_user)
        db.flush()  # Get the user ID without committing

        # Create Auth Credentials
        creds = AuthCredentials(
            user_id=new_user.id,
            password_hash=hash_password(payload.password),
            password_algo="bcrypt"
        )
        db.add(creds)

        # Create Profile with is_business flag
        is_business = bool(business_id)
        profile = Profile(
            user_id=new_user.id,  # Use user_id, not email
            display_name=payload.display_name,
            age=payload.age,
            gender=payload.gender,
            occupation=payload.occupation,
            is_business=is_business,
            business_name=None  # Can be set later
        )
        db.add(profile)

        db.commit()
        db.refresh(new_user)

        # Generate token
        access_token = create_access_token(
            data={"sub": new_user.email}
        )

        logger.info(f"User registered: {new_user.email} (role: {role.role_name})")

        return LoginResponse(
            access_token=access_token,
            token_type="bearer"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=LoginResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    """
    Login endpoint
    """
    try:
        # Get user
        user = db.query(User).filter(User.email == payload.email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Get auth credentials
        creds = (
            db.query(AuthCredentials)
            .filter(AuthCredentials.user_id == user.id)
            .first()
        )
        if not creds:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Check for account lockout
        failed_attempts = creds.failed_attempts if creds.failed_attempts is not None else 0
        if failed_attempts >= 5:
            raise HTTPException(
                status_code=status.HTTP_423_LOCKED,
                detail="Account temporarily locked due to too many failed attempts"
            )

        # Verify password
        if not verify_password(payload.password, creds.password_hash):
            # Increment failed attempts
            current_attempts = creds.failed_attempts if creds.failed_attempts is not None else 0
            creds.failed_attempts = current_attempts + 1
            creds.last_failed_at = datetime.utcnow()
            db.commit()

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Successful login - reset failed attempts
        creds.failed_attempts = 0
        creds.last_failed_at = None
        creds.last_login = datetime.utcnow()
        db.commit()

        # Create token
        access_token = create_access_token(
            data={"sub": user.email}
        )

        logger.info(f"User logged in: {user.email}")

        return LoginResponse(
            access_token=access_token,
            token_type="bearer"
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user"""
    return current_user