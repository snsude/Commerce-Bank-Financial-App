# backend/app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from ..database import get_db
from ..models.user import User
from ..models.auth_credentials import AuthCredentials
from ..security.hashing import hash_password, verify_password
from ..security.jwt_utils import create_access_token
from ..core.dependencies import get_current_user
from ..schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])



@router.post("/register")
def register(payload: UserCreate, db: Session = Depends(get_db)):

    # Check existing email
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create User
    new_user = User(
        email=payload.email,
        role_id=1  # default role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create Auth Credentials
    creds = AuthCredentials(
        user_id=new_user.id,
        password_hash=hash_password(payload.password),
        password_algo="bcrypt"
    )
    db.add(creds)
    db.commit()

    return {"message": "User registered successfully"}



@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # OAuth2 uses username field for email
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    creds = (
        db.query(AuthCredentials)
        .filter(AuthCredentials.user_id == user.id)
        .first()
    )

    if not creds or not verify_password(form_data.password, creds.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create token
    access_token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# -------------------------
# AUTH / ME
# -------------------------
@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
