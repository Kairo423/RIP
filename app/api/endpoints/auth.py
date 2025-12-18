from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from database.database import get_db
import crud.user_crud as user_crud

# Модель для данных, приходящих с фронтенда (логин/пароль)
class LoginRequest(BaseModel):
    login: str
    password: str

# Модель для успешного ответа (можно дополнить токеном)
class LoginResponse(BaseModel):
    user_id: int
    login: str
    full_name: str
    role: str


router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=LoginResponse)
def login_user(login_data: LoginRequest, db: Session = Depends(get_db)):
    # 1. Найти пользователя по логину
    db_user = user_crud.get_user_by_login(db, login=login_data.login)
    
    # 2. Если пользователь не найден — ошибка
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    
    # 3. Сравнить пароль (ЗДЕСЬ: простая проверка, в реальном проекте нужно хеширование!)
    if db_user.password != login_data.password:
        raise HTTPException(status_code=401, detail="Invalid login or password")
    
    # 4. Если всё верно — вернуть успех и ID пользователя
    return LoginResponse(
        user_id=db_user.id,
        login=db_user.login,
        full_name=db_user.full_name,
        role=db_user.role,
    )