from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.restriction_types import RestrictionType
import crud.restriction_type_crud as restriction_type_crud

router = APIRouter(prefix="/restriction_types", tags=["restriction_types"])

@router.post("/", response_model=RestrictionType)
def create_restriction_type(restriction_type: RestrictionType, db: Session = Depends(get_db)):
    db_type = restriction_type_crud.get_restriction_type(db, restriction_type.code)
    if db_type:
        raise HTTPException(status_code=400, detail="Restriction type already exists")
    return restriction_type_crud.create_restriction_type(db=db, restriction_type=restriction_type)

@router.get("/", response_model=List[RestrictionType])
def read_restriction_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return restriction_type_crud.get_restriction_types(db, skip=skip, limit=limit)

@router.get("/{code}", response_model=RestrictionType)
def read_restriction_type(code: str, db: Session = Depends(get_db)):
    db_type = restriction_type_crud.get_restriction_type(db, code)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Restriction type not found")
    return db_type

@router.patch("/{code}", response_model=RestrictionType)
def update_restriction_type(code: str, restriction_type: RestrictionType, db: Session = Depends(get_db)):
    update_data = restriction_type.dict(exclude_unset=True)
    db_type = restriction_type_crud.update_restriction_type(db, code, update_data)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Restriction type not found")
    return db_type

@router.delete("/{code}")
def delete_restriction_type(code: str, db: Session = Depends(get_db)):
    db_type = restriction_type_crud.delete_restriction_type(db, code)
    if db_type is None:
        raise HTTPException(status_code=404, detail="Restriction type not found")
    return {"message": "Restriction type deleted successfully"}
