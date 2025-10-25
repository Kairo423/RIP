from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from database.database import get_db
from models.clients import Client
import crud.client_crud as client_crud

# Создаем router вместо app
router = APIRouter(prefix="/clients", tags=["clients"])

@router.post("/", response_model=Client)
def create_client(client: Client, db: Session = Depends(get_db)):
    db_client = client_crud.get_client_by_email(db, email=client.email)
    if db_client:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_phone = client_crud.get_client_by_phone(db, phone=client.phone)
    if db_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    return client_crud.create_client(db=db, client=client)

@router.get("/", response_model=List[Client])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return client_crud.get_clients(db, skip=skip, limit=limit)

@router.get("/{client_id}", response_model=Client)
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = client_crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

@router.patch("/{client_id}", response_model=Client)
def update_client(client_id: int, client: Client, db: Session = Depends(get_db)):
    update_data = client.dict(exclude_unset=True)
    db_client = client_crud.update_client(db, client_id=client_id, client_data=update_data)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

@router.delete("/{client_id}")
def delete_client(client_id: int, db: Session = Depends(get_db)):
    db_client = client_crud.delete_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"message": "Client deleted successfully"}