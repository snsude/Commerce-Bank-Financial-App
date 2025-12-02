from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship

from ..database import Base  # FIXED: relative import


class BudgetEntry(Base):
    __tablename__ = "budget_entries"

    id = Column(Integer, primary_key=True, index=True)
    budget_id = Column(Integer, ForeignKey("budgets.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    planned = Column(Numeric(12, 2), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    budget = relationship("Budget")
    category = relationship("Category")
    user = relationship("User")