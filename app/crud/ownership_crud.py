from sqlmodel import Session, select
from models.ownership import Ownership

def get_ownership(db: Session, ownership_id: int) -> Ownership | None:
    return db.get(Ownership, ownership_id)

def get_ownerships(db: Session, skip: int = 0, limit: int = 100) -> list[Ownership]:
    statement = select(Ownership).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_ownership(db: Session, ownership: Ownership) -> Ownership:
    db.add(ownership)
    db.commit()
    db.refresh(ownership)
    return ownership

def update_ownership(db: Session, ownership_id: int, update_data: dict) -> Ownership | None:
    ownership = db.get(Ownership, ownership_id)
    if ownership:
        for key, value in update_data.items():
            if value is not None:
                setattr(ownership, key, value)
        db.add(ownership)
        db.commit()
        db.refresh(ownership)
    return ownership

def delete_ownership(db: Session, ownership_id: int) -> Ownership | None:
    ownership = db.get(Ownership, ownership_id)
    if ownership:
        db.delete(ownership)
        db.commit()
    return ownership
