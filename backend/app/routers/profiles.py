from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..core.dependencies import get_current_user
from ..models.profiles import Profile
from ..schemas.profiles import ProfileCreate, ProfileUpdate, ProfileOut
from ..models.user import User

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/", response_model=ProfileOut)
def create_or_update_profile(
    payload: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(Profile).filter(Profile.user_email == current_user.email).first()

    if not profile:
        profile = Profile(
            user_email=current_user.email,
            **payload.model_dump()
        )
        db.add(profile)
    else:
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile


@router.get("/me", response_model=ProfileOut)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(Profile).filter(Profile.user_email == current_user.email).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.delete("/me")
def delete_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(Profile).filter(Profile.user_email == current_user.email).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    db.delete(profile)
    db.commit()
    return {"message": "Profile deleted"}