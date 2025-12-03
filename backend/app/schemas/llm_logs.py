from pydantic import BaseModel
from datetime import datetime
from .shared import ORMBase


class LLMLogBase(BaseModel):
    session_id: str
    prompt: str
    response: str


class LLMLogCreate(LLMLogBase):
    user_id: int  # Added to match database


class LLMLogOut(ORMBase):  # Changed to use ORMBase
    id: int
    user_id: int
    session_id: str
    prompt: str
    response: str
    timestamp: datetime  # Already correct