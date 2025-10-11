from sqlmodel import Session, select
from models.clients import Client

def get_client(db: Session, client_id: int) -> Client | None:
    return db.get(Client, client_id)

def get_client_by_email(db: Session, email: str) -> Client | None:
    statement = select(Client).where(Client.email == email)
    return db.exec(statement).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100) -> list[Client]:
    statement = select(Client).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_client(db: Session, client: Client) -> Client:
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

def update_client(db: Session, client_id: int, client_data: dict) -> Client | None:
    client = db.get(Client, client_id)
    if client:
        for key, value in client_data.items():
            if value is not None:  # Обновляем только переданные поля
                setattr(client, key, value)
        db.add(client)
        db.commit()
        db.refresh(client)
    return client

def delete_client(db: Session, client_id: int) -> Client | None:
    client = db.get(Client, client_id)
    if client:
        db.delete(client)
        db.commit()
    return client