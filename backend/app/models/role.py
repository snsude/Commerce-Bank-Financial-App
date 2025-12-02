from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from ..database import Base


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    user_type = Column(String, nullable=False)
    invite_user = Column(Boolean, default=False)
    
    # CHANGED: String instead of Integer
    permission_level = Column(String, nullable=False)
    
    is_business = Column(Boolean, default=False)
    business_name = Column(String, nullable=True)

    # Relationship to User
    users = relationship("User", back_populates="role")