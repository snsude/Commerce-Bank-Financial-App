# JWT encode/decode functions
# Create access token, verify token
from jose import jwt, JWTError
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

from datetime import datetime, timedelta
from jose import jwt
from config import settings

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_access_token(token: str):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
