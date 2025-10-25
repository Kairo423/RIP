from sqlmodel import Session, select
from models.deals import Deal


def get_deal(db: Session, deal_id: int) -> Deal | None:
    return db.get(Deal, deal_id)


def get_deals(db: Session, skip: int = 0, limit: int = 100) -> list[Deal]:
    statement = select(Deal).offset(skip).limit(limit)
    return db.exec(statement).all()


def create_deal(db: Session, deal: Deal) -> Deal:
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal


def update_deal(db: Session, deal_id: int, update_data: dict) -> Deal | None:
    deal = db.get(Deal, deal_id)
    if deal:
        for key, value in update_data.items():
            if value is not None:
                setattr(deal, key, value)
        db.add(deal)
        db.commit()
        db.refresh(deal)
    return deal


def delete_deal(db: Session, deal_id: int) -> Deal | None:
    deal = db.get(Deal, deal_id)
    if deal:
        db.delete(deal)
        db.commit()
    return deal
