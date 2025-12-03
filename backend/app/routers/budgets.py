from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from database import get_db
from core.dependencies import get_current_user
from models.budget import Budget
from schemas.budgets import BudgetIn, BudgetOut
from models.user import User


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

    # Generate budget_id if not provided
    budget_id = payload.budget_id if payload.budget_id else str(uuid.uuid4())[:8]

    budget = Budget(
        budget_id=budget_id,  # Added
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


@router.get("/{budget_id}", response_model=BudgetOut)
def get_budget(
    budget_id: str,  # Changed from int to str
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget = (
        db.query(Budget)
        .filter(Budget.budget_id == budget_id)
        .filter(Budget.user_id == current_user.id)
        .first()
    )
    
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    return budget


@router.delete("/{budget_id}")
def delete_budget(
    budget_id: str,  # Changed from int to str
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget = (
        db.query(Budget)
        .filter(Budget.budget_id == budget_id)
        .filter(Budget.user_id == current_user.id)
        .first()
    )
    
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    db.delete(budget)
    db.commit()
    return {"message": "Budget deleted"}