# backend/app/main.py
# COMPLETE FILE - Replace everything

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging

load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="ClariFi API", version="1.0.0")

# CORS middleware - CRITICAL: Must be added BEFORE routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "ClariFi Backend API", "version": "1.0.0", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Initialize database on startup
@app.on_event("startup")
def on_startup():
    logger.info("Initializing database...")
    from .database import init_db
    try:
        init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

# Import and include routers AFTER app creation
from .routers.auth import router as auth_router
from .routers.users import router as users_router
from .routers.categories import router as categories_router
from .routers.budgets import router as budget_router
from .routers.goals import router as goals_router
from .routers.llm_logs import router as llm_logs_router
from .routers.budget_entries import router as budget_entries_router
from .routers.transactions import router as transactions_router
from .routers.profiles import router as profiles_router

# Include routers - auth has NO PREFIX to match frontend
app.include_router(auth_router)  # /register, /login, /me
app.include_router(users_router)
app.include_router(categories_router)
app.include_router(budget_router)
app.include_router(goals_router)
app.include_router(llm_logs_router)
app.include_router(budget_entries_router)
app.include_router(transactions_router)
app.include_router(profiles_router)

logger.info("All routers registered successfully")