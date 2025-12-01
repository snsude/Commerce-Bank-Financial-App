from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class LLMLogBase(BaseModel):
    session_id: str
    prompt: str
    response: str


class LLMLogCreate(LLMLogBase):
    pass


class LLMLogOut(LLMLogBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True