from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.deals import Deal
import crud.deal_crud as deal_crud

router = APIRouter(prefix="/deals", tags=["deals"])


@router.post("/", response_model=Deal)
def create_deal(deal: Deal, db: Session = Depends(get_db)):
    return deal_crud.create_deal(db=db, deal=deal)


@router.get("/", response_model=List[Deal])
def read_deals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return deal_crud.get_deals(db, skip=skip, limit=limit)


@router.get("/{deal_id}", response_model=Deal)
def read_deal(deal_id: int, db: Session = Depends(get_db)):
    db_deal = deal_crud.get_deal(db, deal_id)
    if db_deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    return db_deal


@router.patch("/{deal_id}", response_model=Deal)
def update_deal(deal_id: int, deal: Deal, db: Session = Depends(get_db)):
    update_data = deal.dict(exclude_unset=True)
    db_deal = deal_crud.update_deal(db, deal_id, update_data)
    if db_deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    return db_deal


@router.delete("/{deal_id}")
def delete_deal(deal_id: int, db: Session = Depends(get_db)):
    db_deal = deal_crud.delete_deal(db, deal_id)
    if db_deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"message": "Deal deleted successfully"}
