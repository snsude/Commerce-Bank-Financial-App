from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from ..core.dependencies import get_current_user
from ..models.budget import Budget
from ..schemas.budgets import BudgetIn, BudgetOut
from ..models.user import User


router = APIRouter(prefix="/budgets", tags=["Budgets"])



@router.post("/", response_model=BudgetOut)
def create_budget(
    payload: BudgetIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Prevent duplicates
    existing = (
        db.query(Budget)
        .filter(Budget.user_id == current_user.id)
        .filter(Budget.month == payload.month)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Budget already exists for this month")

    budget = Budget(
        user_id=current_user.id,
        month=payload.month,
        updated_at=datetime.utcnow()
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)
    return budget



@router.get("/", response_model=list[BudgetOut])
def get_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Budget)
        .filter(Budget.user_id == current_user.id)
        .all()
    )
