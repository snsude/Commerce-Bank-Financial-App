# User related endpoints (profile, account info)
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from core.dependencies import get_current_user
from models.user import User
from models.role import Role
from schemas.user import UserOut, UserUpdate
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])



@router.get("/me", response_model=UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user



@router.get("/", response_model=List[UserOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Only admins can list all users
    role = db.query(Role).filter(Role.id == current_user.role_id).first()
    
    return db.query(User).filter(User.business_id == current_user.business_id).all()



@router.get("/{user_id}", response_model=UserOut)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/me", response_model=UserOut)
def update_current_user(
    updates: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Get only the fields that were actually set
    update_data = updates.model_dump(exclude_unset=True)
    
    # Update the user with the provided fields
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get("/business/users", response_model=List[UserOut])
def get_business_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get user's role
    role = db.query(Role).filter(Role.id == current_user.role_id).first()
        
    if current_user.business_id is None:
        raise HTTPException(
            status_code=400,
            detail="User is not associated with a business"
        )
    
    return (
        db.query(User)
        .filter(User.business_id == current_user.business_id)
        .all()
    )
