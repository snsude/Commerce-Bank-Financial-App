# backend/app/schemas/user.py
# COMPLETE FILE - Replace entire user.py schema

from pydantic import BaseModel, EmailStr
from typing import Optional
from .shared import ORMBase


# Login schema (for /login endpoint)
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# User creation schema (for /register endpoint)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    display_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    admin_email: Optional[EmailStr] = None  # For sub_users joining business

    model_config = {
        "from_attributes": False
    }


# User update schema
class UserUpdate(BaseModel):
    email: EmailStr | None = None
    role_id: int | None = None
    admin_id: int | None = None

    model_config = {
        "from_attributes": False
    }


# User output schema
class UserOut(ORMBase):
    id: int
    email: EmailStr
    role_id: int | None = None
    admin_id: int | None = None

    model_config = {
        "from_attributes": True
    }