from sqlmodel import SQLModel, Field
from typing import Optional

class RestrictionType(SQLModel, table=True):
    __tablename__ = "restriction_types"

    code: str = Field(primary_key=True, max_length=50, description="Код ограничения прав собственности")
    name: str = Field(nullable=False, unique=True, max_length=150, description="Наименование ограничения")
    description: Optional[str] = Field(default=None, description="Описание ограничения")

    class Config:
        arbitrary_types_allowed = True
