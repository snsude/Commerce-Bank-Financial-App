from pydantic import BaseModel, EmailStr
from .shared import ORMBase



# User creation schema (signup input)
class UserCreate(BaseModel):
    email: EmailStr
    password: str

    model_config = {
        "from_attributes": False   
    }



class UserUpdate(BaseModel):
    email: EmailStr | None = None
    role_id: int | None = None
    admin_id: int | None = None

    model_config = {
        "from_attributes": False
    }



class UserOut(ORMBase):
    id: int
    email: EmailStr
    role_id: int | None = None
    admin_id: int | None = None

    model_config = {
        "from_attributes": True    
    }