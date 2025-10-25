from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.ownership import Ownership
import crud.ownership_crud as ownership_crud

router = APIRouter(prefix="/ownership", tags=["ownership"])

@router.post("/", response_model=Ownership)
def create_ownership(ownership: Ownership, db: Session = Depends(get_db)):
    return ownership_crud.create_ownership(db=db, ownership=ownership)

@router.get("/", response_model=List[Ownership])
def read_ownerships(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return ownership_crud.get_ownerships(db, skip=skip, limit=limit)

@router.get("/{ownership_id}", response_model=Ownership)
def read_ownership(ownership_id: int, db: Session = Depends(get_db)):
    db_ownership = ownership_crud.get_ownership(db, ownership_id)
    if db_ownership is None:
        raise HTTPException(status_code=404, detail="Ownership record not found")
    return db_ownership

@router.patch("/{ownership_id}", response_model=Ownership)
def update_ownership(ownership_id: int, ownership: Ownership, db: Session = Depends(get_db)):
    update_data = ownership.dict(exclude_unset=True)
    db_ownership = ownership_crud.update_ownership(db, ownership_id, update_data)
    if db_ownership is None:
        raise HTTPException(status_code=404, detail="Ownership record not found")
    return db_ownership

@router.delete("/{ownership_id}")
def delete_ownership(ownership_id: int, db: Session = Depends(get_db)):
    db_ownership = ownership_crud.delete_ownership(db, ownership_id)
    if db_ownership is None:
        raise HTTPException(status_code=404, detail="Ownership record not found")
    return {"message": "Ownership record deleted successfully"}
