from sqlmodel import Session, select
from models.restriction_types import RestrictionType

def get_restriction_type(db: Session, code: str) -> RestrictionType | None:
    return db.get(RestrictionType, code)

def get_restriction_types(db: Session, skip: int = 0, limit: int = 100) -> list[RestrictionType]:
    statement = select(RestrictionType).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_restriction_type(db: Session, restriction_type: RestrictionType) -> RestrictionType:
    db.add(restriction_type)
    db.commit()
    db.refresh(restriction_type)
    return restriction_type

def update_restriction_type(db: Session, code: str, update_data: dict) -> RestrictionType | None:
    restriction_type = db.get(RestrictionType, code)
    if restriction_type:
        for key, value in update_data.items():
            if value is not None:
                setattr(restriction_type, key, value)
        db.add(restriction_type)
        db.commit()
        db.refresh(restriction_type)
    return restriction_type

def delete_restriction_type(db: Session, code: str) -> RestrictionType | None:
    restriction_type = db.get(RestrictionType, code)
    if restriction_type:
        db.delete(restriction_type)
        db.commit()
    return restriction_type
