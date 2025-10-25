from sqlmodel import SQLModel, Field
from typing import Optional

class OwnershipType(SQLModel, table=True):
    __tablename__ = "ownership_types"

    code: str = Field(primary_key=True, max_length=50, description="Код вида права собственности")
    name: str = Field(nullable=False, unique=True, max_length=150, description="Наименование вида права")
    description: Optional[str] = Field(default=None, description="Описание вида права")

    class Config:
        arbitrary_types_allowed = True
