from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "My FastAPI App"
    VERSION: str = "1.0.0"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()