from sqlmodel import Session, select
from models.users import User

def get_user(db: Session, user_id: int) -> User | None:
    return db.get(User, user_id)

def get_user_by_login(db: Session, login: str) -> User | None:
    statement = select(User).where(User.login == login)
    return db.exec(statement).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    statement = select(User).offset(skip).limit(limit)
    return db.exec(statement).all()

def create_user(db: Session, user: User) -> User:
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user_id: int, user_data: dict) -> User | None:
    user = db.get(User, user_id)
    if user:
        for key, value in user_data.items():
            if value is not None:
                setattr(user, key, value)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

def delete_user(db: Session, user_id: int) -> User | None:
    user = db.get(User, user_id)
    if user:
        db.delete(user)
        db.commit()
    return user
