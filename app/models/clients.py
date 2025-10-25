from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.deals import Deal
    from models.ownership import Ownership

class Client(SQLModel, table=True):
    __tablename__ = "clients"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(nullable=False, max_length=200)
    phone: str = Field(nullable=False, unique=True, max_length=20)
    email: Optional[str] = Field(default=None, unique=True, max_length=100)
    client_type: Optional[str] = Field(default=None, max_length=50)
    
        # ORM relationships
    ownerships: list["Ownership"] = Relationship(back_populates="owner")
    deals: list["Deal"] = Relationship(back_populates="client")
    
    class Config:
        arbitrary_types_allowed = True