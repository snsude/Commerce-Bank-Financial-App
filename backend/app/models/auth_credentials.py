from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from ..database import Base  # FIXED: relative import


class AuthCredentials(Base):
    __tablename__ = "authcredentials"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    password_algo = Column(String, nullable=False)
    password_updated_at = Column(DateTime, nullable=True)
    failed_attempts = Column(Integer, default=0)
    last_failed_at = Column(DateTime, nullable=True)
    last_login = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="auth_credentials")