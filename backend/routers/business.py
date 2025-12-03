from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from core.dependencies import get_current_user
from models.business import Business
from schemas.business import BusinessCreate, BusinessOut
from models.user import User

router = APIRouter(prefix="/businesses", tags=["Businesses"])


@router.post("/", response_model=BusinessOut)
def create_business(
    payload: BusinessCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if user has permission to create business
    if getattr(current_user, "role_id", None) != 2:  # Assuming role_id 2 is business_admin
        raise HTTPException(
            status_code=403,
            detail="Only business admins can create businesses"
        )
    
    business = Business(
        name=payload.name,
        created_by=current_user.id
    )
    
    db.add(business)
    db.commit()
    db.refresh(business)
    return business


@router.get("/", response_model=List[BusinessOut])
def list_businesses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Business).all()


@router.get("/my-business", response_model=BusinessOut)
def get_my_business(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    business = db.query(Business).filter(
        Business.created_by == current_user.id
    ).first()
    
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    
    return business