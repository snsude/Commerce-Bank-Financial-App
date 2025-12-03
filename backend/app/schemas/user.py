# backend/app/schemas/user.py
# COMPLETE FILE - Updated to match database schema

from pydantic import BaseModel, EmailStr
from datetime import datetime
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
    role_id: Optional[int] = None
    business_id: Optional[int] = None
    admin_email: Optional[EmailStr] = None  # For sub_users joining business

    model_config = {
        "from_attributes": False
    }


# User update schema
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    role_id: Optional[int] = None
    business_id: Optional[int] = None
    admin_email: Optional[EmailStr] = None

    model_config = {
        "from_attributes": False
    }


# User output schema
class UserOut(ORMBase):
    id: int
    email: EmailStr
    role_id: Optional[int] = None
    business_id: Optional[int] = None
    admin_email: Optional[EmailStr] = None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }