from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=True)
    admin_email = Column(String, ForeignKey("users.email"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    role = relationship("Role", back_populates="users")
    business = relationship("Business", back_populates="users")
    admin = relationship("User", remote_side=[email], foreign_keys=[admin_email])
    
    # 1-to-1 relationship
    auth_credentials = relationship(
        "AuthCredentials",
        back_populates="user",
        uselist=False
    )
    
    # 1-to-many relationships
    budgets = relationship("Budget", back_populates="user")
    budget_entries = relationship("BudgetEntry", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    goals = relationship("Goal", back_populates="user")
    llm_logs = relationship("LLMLog", back_populates="user")