from pydantic import BaseModel
from datetime import date, datetime
from .shared import ORMBase


class BudgetIn(BaseModel):
    month: date   # "2025-10-01"


class BudgetOut(ORMBase):
    id: int
    user_id: int
    month: date
    updated_at: datetime | None = None
