from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, nullable=False)
    permission_level = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # Relationship to User
    users = relationship("User", back_populates="role")