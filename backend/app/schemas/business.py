from pydantic import BaseModel
from datetime import datetime
from .shared import ORMBase


class BusinessBase(BaseModel):
    name: str


class BusinessCreate(BusinessBase):
    created_by: int  # user_id


class BusinessOut(ORMBase):
    id: int
    name: str
    created_by: int
    created_at: datetime