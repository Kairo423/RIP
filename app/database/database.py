from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Замените на вашу строку подключения
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:igkirill23@localhost/estate_agency"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Функция для получения сессии БД
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()