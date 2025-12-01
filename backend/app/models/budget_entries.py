from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship

from backend.app.database import Base


class BudgetEntry(Base):
    __tablename__ = "budget_entries"

    id = Column(Integer, primary_key=True, index=True)

    # Connect to a user's monthly budget
    budget_id = Column(Integer, ForeignKey("budgets.id", ondelete="CASCADE"), nullable=False)

    # Category this entry is for
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    # Planned amount for that category
    planned = Column(Numeric(12, 2), nullable=False)

    # user owner
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    budget = relationship("Budget")
    category = relationship("Category")
    user = relationship("User")
