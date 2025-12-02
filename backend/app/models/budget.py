from sqlalchemy import Column, Integer, ForeignKey, Date, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime

from ..database import Base  # FIXED: relative import


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    month = Column(Date, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("user_id", "month", name="uq_budget_user_month"),
    )

    user = relationship("User")
