from fastapi import FastAPI
from database.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api.endpoints import all_routers

app = FastAPI(title="Estate Agency", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ваш React адрес
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


for router in all_routers:
    app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to My FastAPI App!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
    
