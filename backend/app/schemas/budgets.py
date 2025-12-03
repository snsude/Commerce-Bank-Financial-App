from pydantic import BaseModel
from datetime import date, datetime
from .shared import ORMBase


class BudgetIn(BaseModel):
    budget_id: str  # Added to match database (string type)
    month: date   # "2025-10-01"
    user_id: int  # Added to match database


class BudgetOut(ORMBase):
    id: int
    budget_id: str  # Added to match database
    user_id: int
    month: date
    updated_at: datetime | None = None