from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.categories import Category
from schemas.categories import CategoryOut

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("/", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()
