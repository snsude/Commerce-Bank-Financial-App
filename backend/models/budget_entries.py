from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship

from database import Base


# NOTE: Your database schema shows TWO tables:
# 1. "budgetentries" (main table, more populated)
# 2. "budget_entries" (less populated)
# 
# This model currently points to "budget_entries"
# If you want to use the main table, change __tablename__ to "budgetentries"

class BudgetEntry(Base):
    __tablename__ = "budgetentries"  # Changed to match main table in schema

    id = Column(Integer, primary_key=True, index=True)
    budget_id = Column(Integer, ForeignKey("budgets.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    planned = Column(Numeric(12, 2), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    budget = relationship("Budget")
    category = relationship("Category")
    user = relationship("User", back_populates="budget_entries")