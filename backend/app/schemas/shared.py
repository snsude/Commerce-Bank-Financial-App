# Shared response objects or base schemas
from pydantic import BaseModel

class ORMBase(BaseModel):
    class Config:
        from_attributes = True
