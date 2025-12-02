# backend/app/database.py

from dotenv import load_dotenv
load_dotenv()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise Exception("DATABASE_URL is missing. Check your .env file location or name.")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Initialize database - creates all tables
    Import models here to avoid circular imports
    """
    # Import all models so they're registered with Base
    from .models import user, role, auth_credentials, profiles
    from .models import budget, budget_entries, categories
    from .models import transactions, goals, llm_logs
    
    Base.metadata.create_all(bind=engine)