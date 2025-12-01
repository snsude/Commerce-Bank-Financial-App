# User related endpoints (profile, account info)
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..core.dependencies import get_current_user
from ..models.user import User
from ..schemas.user import UserOut, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])



@router.get("/me", response_model=UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user



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



@router.put("/update", response_model=UserOut)
def update_user(
    updates: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Change email
    if updates.email:
        current_user.email = updates.email

    # Change role 
    if updates.role_id is not None:
        current_user.role_id = updates.role_id

    # Change admin link
    if updates.admin_id is not None:
        current_user.admin_id = updates.admin_id

    db.commit()
    db.refresh(current_user)

    return current_user
