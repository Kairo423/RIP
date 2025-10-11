from fastapi import FastAPI
from database.database import create_db_and_tables
import uvicorn
from api.endpoints.clients_endpoints import router as clients_router

app = FastAPI(title="Estate Agency", version="1.0.0")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(clients_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to My FastAPI App!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
    
