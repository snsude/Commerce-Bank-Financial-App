from sqlalchemy import Column, Integer, ForeignKey, Date, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime

from backend.app.database import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Example: 2025-10-01 to represent October 2025
    month = Column(Date, nullable=False)

    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        # One budget per user per month
        UniqueConstraint("user_id", "month", name="uq_budget_user_month"),
    )

    user = relationship("User")
    # entries = relationship("BudgetEntry", back_populates="budget")
