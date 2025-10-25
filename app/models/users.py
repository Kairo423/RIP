from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    login: str = Field(nullable=False, unique=True, max_length=50)
    password: str = Field(nullable=False, max_length=200)
    full_name: str = Field(nullable=False, max_length=200)
    position: Optional[str] = Field(default=None, max_length=100)
    role: Optional[str] = Field(default=None, max_length=50)

    class Config:
        arbitrary_types_allowed = True
