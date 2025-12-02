from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from ..database import Base  # FIXED: relative import


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, ForeignKey("users.email"), nullable=False)
    display_name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=True)

    user = relationship("User")
    role = relationship("Role")