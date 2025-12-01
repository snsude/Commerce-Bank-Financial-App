from pydantic import BaseModel
from .shared import ORMBase


class BudgetEntryIn(BaseModel):
    budget_id: int
    category_id: int
    planned: float


class BudgetEntryOut(ORMBase):
    id: int
    budget_id: int
    category_id: int
    planned: float
    user_id: int
