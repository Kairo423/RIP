from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import date
from decimal import Decimal

if TYPE_CHECKING:
    from models.real_estate import RealEstate
    from models.clients import Client
    from models.users import User


class Deal(SQLModel, table=True):
    __tablename__ = "deals"

    id: Optional[int] = Field(default=None, primary_key=True)
    deal_type: str = Field(nullable=False)
    real_estate_id: int = Field(foreign_key="real_estate_objects.id", nullable=False)
    client_id: int = Field(foreign_key="clients.id", nullable=False)
    employee_id: int = Field(foreign_key="users.id", nullable=False)
    deal_date: date = Field(nullable=False)
    amount: Decimal = Field(nullable=False)
    status: Optional[str] = Field(default=None)

    # ORM relationships
    real_estate: Optional["RealEstate"] = Relationship(back_populates="deals")
    client: Optional["Client"] = Relationship(back_populates="deals")
    employee: Optional["User"] = Relationship(back_populates="deals")

    class Config:
        arbitrary_types_allowed = True
