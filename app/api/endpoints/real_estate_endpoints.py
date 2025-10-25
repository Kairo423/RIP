from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.real_estate import RealEstate
import crud.real_estate_crud as real_estate_crud

router = APIRouter(prefix="/real_estate", tags=["real_estate"])

@router.post("/", response_model=RealEstate)
def create_real_estate(real_estate: RealEstate, db: Session = Depends(get_db)):
    return real_estate_crud.create_real_estate(db=db, real_estate=real_estate)

@router.get("/", response_model=List[RealEstate])
def read_real_estates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return real_estate_crud.get_real_estates(db, skip=skip, limit=limit)

@router.get("/{real_estate_id}", response_model=RealEstate)
def read_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    real_estate = real_estate_crud.get_real_estate(db, real_estate_id)
    if real_estate is None:
        raise HTTPException(status_code=404, detail="Real estate object not found")
    return real_estate

@router.patch("/{real_estate_id}", response_model=RealEstate)
def update_real_estate(real_estate_id: int, real_estate: RealEstate, db: Session = Depends(get_db)):
    update_data = real_estate.dict(exclude_unset=True)
    updated = real_estate_crud.update_real_estate(db, real_estate_id, update_data)
    if updated is None:
        raise HTTPException(status_code=404, detail="Real estate object not found")
    return updated

@router.delete("/{real_estate_id}")
def delete_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    deleted = real_estate_crud.delete_real_estate(db, real_estate_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Real estate object not found")
    return {"message": "Real estate object deleted successfully"}
