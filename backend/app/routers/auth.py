# backend/app/routers/auth.py
# COMPLETE FILE - Handles admin_email in request but stores admin_id in database

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
import logging

from ..database import get_db
from ..models.user import User
from ..models.auth_credentials import AuthCredentials
from ..models.profiles import Profile
from ..models.role import Role
from ..security.hashing import hash_password, verify_password
from ..security.jwt_utils import create_access_token
from ..core.dependencies import get_current_user
from ..schemas.user import UserCreate, UserOut, UserLogin

router = APIRouter(tags=["Authentication"])
logger = logging.getLogger(__name__)


@router.post("/register")
def register(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Register endpoint - handles all three user types:
    Frontend sends admin_email, we convert to admin_id for database
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
        
        # Determine role based on admin_email
        if payload.admin_email:
            # User is joining a business account - look up admin by email
            admin_user = db.query(User).filter(User.email == payload.admin_email).first()
            if not admin_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Admin email not found"
                )
            
            # Get sub_user role
            role = db.query(Role).filter(Role.user_type == 'sub_user').first()
            if not role:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Sub-user role not found in database"
                )
            role_id = role.id
            admin_id = admin_user.id  # Store admin's ID, not email
            
        else:
            # No admin_email - default to 'user' role (personal account)
            role = db.query(Role).filter(Role.user_type == 'user').first()
            
            if not role:
                # Create default roles if they don't exist
                logger.warning("Roles not found, creating default roles")
                user_role = Role(
                    user_type='user',
                    invite_user=False,
                    permission_level='full-access',
                    is_business=False
                )
                admin_role = Role(
                    user_type='admin',
                    invite_user=True,
                    permission_level='full-access',
                    is_business=True
                )
                sub_user_role = Role(
                    user_type='sub_user',
                    invite_user=False,
                    permission_level='read-only',
                    is_business=True
                )
                db.add_all([user_role, admin_role, sub_user_role])
                db.commit()
                
                role = user_role
            
            role_id = role.id

        # Create User with admin_id (integer)
        new_user = User(
            email=payload.email,
            role_id=role_id,
            admin_id=admin_id  # This is an integer (user ID), not email
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

        # Create Profile
        profile = Profile(
            user_email=new_user.email,
            display_name=payload.display_name,
            age=payload.age,
            gender=payload.gender,
            occupation=payload.occupation,
            role_id=role_id
        )
        db.add(profile)

        db.commit()
        db.refresh(new_user)

        # Generate token (using email as subject)
        access_token = create_access_token(
            data={"sub": new_user.email}
        )

        logger.info(f"User registered successfully: {new_user.email} (role_id: {role_id})")

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": new_user.id,
            "email": new_user.email,
            "role_id": new_user.role_id
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):
    """
    Login endpoint - accepts JSON with email and password
    """
    try:
        # Get user - SQLAlchemy will automatically query with correct columns
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
        if creds.failed_attempts and creds.failed_attempts >= 5:
            raise HTTPException(
                status_code=status.HTTP_423_LOCKED,
                detail="Account temporarily locked due to too many failed attempts"
            )

        # Verify password
        if not verify_password(payload.password, creds.password_hash):
            # Increment failed attempts
            creds.failed_attempts = (creds.failed_attempts or 0) + 1
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

        # Create token (using email as subject)
        access_token = create_access_token(
            data={"sub": user.email}
        )

        logger.info(f"User logged in successfully: {user.email}")

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "role_id": user.role_id
        }

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