from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.deals import Deal

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    login: str = Field(nullable=False, unique=True, max_length=50)
    password: str = Field(nullable=False, max_length=200)
    full_name: str = Field(nullable=False, max_length=200)
    position: Optional[str] = Field(default=None, max_length=100)
    role: Optional[str] = Field(default=None, max_length=50)
    
    deals: list["Deal"] = Relationship(back_populates="employee")

    class Config:
        arbitrary_types_allowed = True
