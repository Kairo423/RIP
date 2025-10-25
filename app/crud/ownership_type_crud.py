from sqlmodel import Session, select
from models.ownership_types import OwnershipType

def get_ownership_type(db: Session, code: str) -> OwnershipType | None:
    return db.get(OwnershipType, code)

def get_ownership_types(db: Session, skip: int = 0, limit: int = 100) -> list[OwnershipType]:
    statement = select(OwnershipType).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_ownership_type(db: Session, ownership_type: OwnershipType) -> OwnershipType:
    db.add(ownership_type)
    db.commit()
    db.refresh(ownership_type)
    return ownership_type

def update_ownership_type(db: Session, code: str, update_data: dict) -> OwnershipType | None:
    ownership_type = db.get(OwnershipType, code)
    if ownership_type:
        for key, value in update_data.items():
            if value is not None:
                setattr(ownership_type, key, value)
        db.add(ownership_type)
        db.commit()
        db.refresh(ownership_type)
    return ownership_type

def delete_ownership_type(db: Session, code: str) -> OwnershipType | None:
    ownership_type = db.get(OwnershipType, code)
    if ownership_type:
        db.delete(ownership_type)
        db.commit()
    return ownership_type
