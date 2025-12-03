from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import Optional
from .shared import ORMBase


class GoalBase(BaseModel):
    name: str = Field(..., min_length=1)
    type: str = Field(..., pattern="^(savings|debt_paydown)$")  # Changed to match database
    target_amount: float = Field(..., gt=0)
    current_amount: float = Field(default=0, ge=0)
    target_date: Optional[date] = None
    status: str = "on track"  # Made non-optional


class GoalCreate(GoalBase):
    user_id: int


class GoalUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    type: Optional[str] = Field(None, pattern="^(savings|debt_paydown)$")
    target_amount: Optional[float] = Field(None, gt=0)
    current_amount: Optional[float] = Field(None, ge=0)
    target_date: Optional[date] = None
    status: Optional[str] = None


class GoalOut(ORMBase):
    id: int
    user_id: int
    name: str
    type: str
    target_amount: float
    current_amount: float
    target_date: Optional[date] = None
    status: str
    created_at: datetime