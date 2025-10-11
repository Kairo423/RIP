from fastapi import FastAPI
from app.core.config import settings
from app.database import create_db_and_tables
from app.api.endpoints import items, auth

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# Подключаем роутеры
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(items.router, prefix="/items", tags=["items"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI application"}