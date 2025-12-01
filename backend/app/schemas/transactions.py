from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TransactionIn(BaseModel):
    category_id: int
    amount: float   # positive = income, negative = expense

class TransactionOut(BaseModel):
    id: int
    category_id: int
    amount: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
