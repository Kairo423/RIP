from fastapi import FastAPI, Depends
import uvicorn
from database.database import get_db, engine, Base
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/")
def root():
    return("Hello Woorld!")

@app.get("/")
def read_root(db: Session = Depends(get_db)):
    # Теперь у вас есть подключение к БД через db
    # Пример: result = db.execute("SELECT version()")
    return {"message": "Connected to PostgreSQL!"}

@app.get("/test-connection")
def test_connection(db: Session = Depends(get_db)):
    try:
        # Простой тест подключения
        result = db.execute("SELECT 1")
        return {"status": "success", "message": "Database connection working"}
    except Exception as e:
        return {"status": "error", "message": str(e)}



if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
    
