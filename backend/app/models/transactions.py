from sqlalchemy import Column, Integer, ForeignKey, Numeric, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from ..database import Base  # FIXED: relative import


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User")
    category = relationship("Category")
