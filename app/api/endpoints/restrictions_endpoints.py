from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.restrictions import Restriction
import crud.restrictions_crud as restrictions_crud

router = APIRouter(prefix="/restrictions", tags=["restrictions"])

@router.post("/", response_model=Restriction)
def create_restriction(restriction: Restriction, db: Session = Depends(get_db)):
    return restrictions_crud.create_restriction(db=db, restriction=restriction)

@router.get("/", response_model=List[Restriction])
def read_restrictions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return restrictions_crud.get_restrictions(db, skip=skip, limit=limit)

@router.get("/{restriction_id}", response_model=Restriction)
def read_restriction(restriction_id: int, db: Session = Depends(get_db)):
    db_restriction = restrictions_crud.get_restriction(db, restriction_id)
    if db_restriction is None:
        raise HTTPException(status_code=404, detail="Restriction not found")
    return db_restriction

@router.patch("/{restriction_id}", response_model=Restriction)
def update_restriction(restriction_id: int, restriction: Restriction, db: Session = Depends(get_db)):
    update_data = restriction.dict(exclude_unset=True)
    db_restriction = restrictions_crud.update_restriction(db, restriction_id, update_data)
    if db_restriction is None:
        raise HTTPException(status_code=404, detail="Restriction not found")
    return db_restriction

@router.delete("/{restriction_id}")
def delete_restriction(restriction_id: int, db: Session = Depends(get_db)):
    db_restriction = restrictions_crud.delete_restriction(db, restriction_id)
    if db_restriction is None:
        raise HTTPException(status_code=404, detail="Restriction not found")
    return {"message": "Restriction deleted successfully"}
