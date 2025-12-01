from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..core.dependencies import get_current_user
from ..models.transactions import Transaction
from ..schemas.transactions import TransactionIn, TransactionOut
from ..models.user import User

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post("/", response_model=TransactionOut)
def create_transaction(
    payload: TransactionIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tx = Transaction(
        user_id=current_user.id,
        category_id=payload.category_id,
        amount=payload.amount
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx



@router.get("/", response_model=list[TransactionOut])
def get_transactions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .order_by(Transaction.created_at.desc())
        .all()
    )



@router.get("/by-category/{category_id}", response_model=list[TransactionOut])
def get_transactions_by_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Transaction)
        .filter(Transaction.category_id == category_id)
        .filter(Transaction.user_id == current_user.id)
        .order_by(Transaction.created_at.desc())
        .all()
    )
