from .shared import ORMBase

class CategoryOut(ORMBase):
    id: int
    name: str
    kind: str          # "income" or "expense"
    parent_id: int | None = None
