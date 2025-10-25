from sqlmodel import Session, select
from models.real_estate import RealEstate

def get_real_estate(db: Session, real_estate_id: int) -> RealEstate | None:
    return db.get(RealEstate, real_estate_id)

def get_real_estates(db: Session, skip: int = 0, limit: int = 100) -> list[RealEstate]:
    statement = select(RealEstate).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_real_estate(db: Session, real_estate: RealEstate) -> RealEstate:
    db.add(real_estate)
    db.commit()
    db.refresh(real_estate)
    return real_estate

def update_real_estate(db: Session, real_estate_id: int, update_data: dict) -> RealEstate | None:
    real_estate = db.get(RealEstate, real_estate_id)
    if real_estate:
        for key, value in update_data.items():
            if value is not None:
                setattr(real_estate, key, value)
        db.add(real_estate)
        db.commit()
        db.refresh(real_estate)
    return real_estate

def delete_real_estate(db: Session, real_estate_id: int) -> RealEstate | None:
    real_estate = db.get(RealEstate, real_estate_id)
    if real_estate:
        db.delete(real_estate)
        db.commit()
    return real_estate
