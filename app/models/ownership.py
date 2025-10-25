from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import date

if TYPE_CHECKING:
    from models.real_estate import RealEstate
    from models.ownership_types import OwnershipType
    from models.clients import Client

class Ownership(SQLModel, table=True):
    __tablename__ = "ownership"

    id: Optional[int] = Field(default=None, primary_key=True)
    real_estate_id: int = Field(foreign_key="real_estate_objects.id", nullable=False)
    ownership_type_code: str = Field(foreign_key="ownership_types.code", nullable=False)
    owner_id: int = Field(foreign_key="clients.id", nullable=False)
    registration_date: date = Field(nullable=False)
    document_reference: Optional[str] = Field(default=None)

    # ORM Relationships
    real_estate: Optional["RealEstate"] = Relationship(back_populates="ownerships")
    ownership_type: Optional["OwnershipType"] = Relationship(back_populates="ownerships")
    owner: Optional["Client"] = Relationship(back_populates="ownerships")

    class Config:
        arbitrary_types_allowed = True
