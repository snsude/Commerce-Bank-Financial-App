from pydantic import BaseModel
from datetime import datetime, date


class GoalBase(BaseModel):
    name: str
    type: str
    target_amount: float
    current_amount: float | None = 0
    target_date: date | None = None


class GoalCreate(GoalBase):
    pass


class GoalOut(GoalBase):
    id: int
    user_id: int
    status: str
    created_at: datetime  # <-- MUST be datetime, not date

    class Config:
        from_attributes = True  # replaces orm_mode = True
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime


class GoalBase(BaseModel):
    name: str = Field(..., min_length=1)
    type: str = Field(..., pattern="^(savings|debt)$")
    target_amount: float = Field(..., gt=0)
    current_amount: float = Field(..., ge=0)
    target_date: Optional[date] = None
    status: Optional[str] = "on track"


class GoalCreate(GoalBase):
    pass


class GoalOut(GoalBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
