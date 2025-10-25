from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.ownership_types import OwnershipType
import crud.ownership_type_crud as ownership_type_crud

router = APIRouter(prefix="/ownership_types", tags=["ownership_types"])

@router.post("/", response_model=OwnershipType)
def create_ownership_type(ownership_type: OwnershipType, db: Session = Depends(get_db)):
    db_type = ownership_type_crud.get_ownership_type(db, ownership_type.code)
    if db_type:
        raise HTTPException(status_code=400, detail="Ownership type already exists")
    return ownership_type_crud.create_ownership_type(db=db, ownership_type=ownership_type)

@router.get("/", response_model=List[OwnershipType])
def read_ownership_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return ownership_type_crud.get_ownership_types(db, skip=skip, limit=limit)

@router.get("/{code}", response_model=OwnershipType)
def read_ownership_type(code: str, db: Session = Depends(get_db)):
    db_type = ownership_type_crud.get_ownership_type(db, code)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Ownership type not found")
    return db_type

@router.patch("/{code}", response_model=OwnershipType)
def update_ownership_type(code: str, ownership_type: OwnershipType, db: Session = Depends(get_db)):
    update_data = ownership_type.dict(exclude_unset=True)
    db_type = ownership_type_crud.update_ownership_type(db, code, update_data)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Ownership type not found")
    return db_type

@router.delete("/{code}")
def delete_ownership_type(code: str, db: Session = Depends(get_db)):
    db_type = ownership_type_crud.delete_ownership_type(db, code)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Ownership type not found")
    return {"message": "Ownership type deleted successfully"}
