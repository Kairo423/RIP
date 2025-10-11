from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.ext.asyncio import create_async_engine


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:igkirill23@localhost:5432/estate_agency"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

def get_db():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)