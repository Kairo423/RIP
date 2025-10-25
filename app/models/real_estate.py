from sqlmodel import SQLModel, Field
from typing import Optional

class RealEstate(SQLModel, table=True):
    __tablename__ = "real_estate_objects"

    id: Optional[int] = Field(default=None, primary_key=True)
    type: str = Field(nullable=False, max_length=100, description="Тип недвижимости")
    address: str = Field(nullable=False, max_length=200, description="Адрес объекта")
    area: float = Field(nullable=False, description="Площадь в квадратных метрах")
    rooms: Optional[int] = Field(default=None, description="Количество комнат")
    floor: Optional[int] = Field(default=None, description="Этаж")
    price: Optional[float] = Field(default=None, description="Стоимость объекта")
    description: Optional[str] = Field(default=None, description="Описание объекта")
    status: Optional[str] = Field(default=None, description="Статус объекта (например, доступен, продан)")

    class Config:
        arbitrary_types_allowed = True
