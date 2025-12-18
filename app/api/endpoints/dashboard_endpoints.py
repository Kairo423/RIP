from fastapi import APIRouter, Depends
from sqlmodel import Session
from database.database import get_db
from models.clients import Client
from models.deals import Deal
from models.real_estate import RealEstate
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

class DashboardStats(BaseModel):
    total_properties: int
    total_clients: int
    active_deals: int

class RecentDeal(BaseModel):
    client: str
    property: str
    amount: float

class NewProperty(BaseModel):
    address: str
    type: str
    price: float

class DashboardData(BaseModel):
    stats: DashboardStats
    recent_deals: List[RecentDeal]
    new_properties: List[NewProperty]

@router.get("/", response_model=DashboardData)
def get_dashboard_data(db: Session = Depends(get_db)):
    total_properties = db.query(RealEstate).count()
    total_clients = db.query(Client).count()
    active_deals = db.query(Deal).filter(Deal.status == "active").count()

    recent_deals = (
        db.query(Deal)
        .join(Client, Deal.client_id == Client.id)
        .join(RealEstate, Deal.real_estate_id == RealEstate.id)
        .order_by(Deal.deal_date.desc())
        .limit(5)
        .all()
    )
    recent_deals_data = [
        RecentDeal(
            client=deal.client.full_name,
            property=deal.real_estate.address,
            amount=deal.amount,
        )
        for deal in recent_deals
    ]

    new_properties = (
        db.query(RealEstate)
        .order_by(RealEstate.id.desc())
        .limit(5)
        .all()
    )
    new_properties_data = [
        NewProperty(
            address=prop.address,
            type=prop.type,
            price=prop.price,
        )
        for prop in new_properties
    ]

    return DashboardData(
        stats=DashboardStats(
            total_properties=total_properties,
            total_clients=total_clients,
            active_deals=active_deals,
        ),
        recent_deals=recent_deals_data,
        new_properties=new_properties_data,
    )