from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)

    # Role relationship
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    role = relationship("Role", back_populates="users")

    # Admin to Sub-user linking
    # A user can optionally belong to an admin (for organizations)
    admin_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    admin = relationship("User", remote_side=[id])

    # Login credentials (1-to-1)
    auth_credentials = relationship(
        "AuthCredentials",
        back_populates="user",
        uselist=False
    )

    # Other relationships
    budgets = relationship("Budget", back_populates="user")
    budget_entries = relationship("BudgetEntry", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    goals = relationship("Goal", back_populates="user")
    llm_logs = relationship("LLMLog", back_populates="user")
