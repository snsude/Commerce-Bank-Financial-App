from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..core.dependencies import get_current_user
from ..models.budget_entries import BudgetEntry
from ..schemas.budget_entries import BudgetEntryIn, BudgetEntryOut
from ..models.user import User


router = APIRouter(prefix="/budget-entries", tags=["Budget Entries"])



@router.post("/", response_model=BudgetEntryOut)
def add_entry(
    payload: BudgetEntryIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    entry = BudgetEntry(
        budget_id=payload.budget_id,
        category_id=payload.category_id,
        planned=payload.planned,
        user_id=current_user.id
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry



@router.get("/{budget_id}", response_model=list[BudgetEntryOut])
def get_entries(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(BudgetEntry)
        .filter(BudgetEntry.budget_id == budget_id)
        .filter(BudgetEntry.user_id == current_user.id)
        .all()
    )
