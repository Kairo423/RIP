from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import date

if TYPE_CHECKING:
    from models.real_estate import RealEstate
    from models.restriction_types import RestrictionType

class Restriction(SQLModel, table=True):
    __tablename__ = "restrictions"

    id: Optional[int] = Field(default=None, primary_key=True)
    real_estate_id: int = Field(foreign_key="real_estate_objects.id", nullable=False)
    restriction_type_code: str = Field(foreign_key="restriction_types.code", nullable=False)
    imposed_date: date = Field(nullable=False)
    removed_date: Optional[date] = Field(default=None)
    basis: Optional[str] = Field(default=None)

    # ORM Relationships
    real_estate: Optional["RealEstate"] = Relationship(back_populates="restrictions")
    restriction_type: Optional["RestrictionType"] = Relationship(back_populates="restrictions")

    class Config:
        arbitrary_types_allowed = True
