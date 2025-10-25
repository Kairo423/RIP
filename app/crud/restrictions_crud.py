from sqlmodel import Session, select
from models.restrictions import Restriction

def get_restriction(db: Session, restriction_id: int) -> Restriction | None:
    return db.get(Restriction, restriction_id)

def get_restrictions(db: Session, skip: int = 0, limit: int = 100) -> list[Restriction]:
    statement = select(Restriction).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_restriction(db: Session, restriction: Restriction) -> Restriction:
    db.add(restriction)
    db.commit()
    db.refresh(restriction)
    return restriction

def update_restriction(db: Session, restriction_id: int, update_data: dict) -> Restriction | None:
    restriction = db.get(Restriction, restriction_id)
    if restriction:
        for key, value in update_data.items():
            if value is not None:
                setattr(restriction, key, value)
        db.add(restriction)
        db.commit()
        db.refresh(restriction)
    return restriction

def delete_restriction(db: Session, restriction_id: int) -> Restriction | None:
    restriction = db.get(Restriction, restriction_id)
    if restriction:
        db.delete(restriction)
        db.commit()
    return restriction
