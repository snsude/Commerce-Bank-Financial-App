from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

# Routers
from .routers.auth import router as auth_router
from .routers.users import router as users_router
from .routers.categories import router as categories_router
from .routers.budgets import router as budget_router
from .routers.goals import router as goals_router
from .routers.llm_logs import router as llm_logs_router
from .routers.budget_entries import router as budget_entries_router   # <<< ADD THIS
from .routers.transactions import router as transactions_router 
from .routers.profiles import router as profiles_router


# Database init
from .database import init_db

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {"message": "Backend is running"}

# Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(categories_router)
app.include_router(budget_router)
app.include_router(goals_router)
app.include_router(llm_logs_router)
app.include_router(budget_entries_router)     
app.include_router(transactions_router)
app.include_router(profiles_router)