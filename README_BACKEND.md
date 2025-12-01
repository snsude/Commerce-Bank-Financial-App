ClariFi Backend Architecture Overview
(FastAPI + PostgreSQL)
This document explains how our backend is organized, what each folder does, and the purpose of each file. The goal is to give the team a clean, easy-to-understand picture of how the backend works and how everything fits together.

1. Top-Level Project Layout
.venv/
This is our Python virtual environment. It holds all backend libraries so they don’t clash with system-wide packages. Nothing inside here is edited manually.
backend/
This folder contains the entire FastAPI backend — routes, models, database code, authentication, and configuration.
Docs/
A place to store project documentation, diagrams, and sprint deliverables.
.env
A private configuration file that stores sensitive values like:
Database connection string


JWT secret


Environment mode
 This file is not pushed to GitHub for security reasons.


README_BACKEND.md
Setup instructions and a quick guide for running the backend.
requirements.txt
List of Python dependencies required to run the backend.
 Everyone installs these using:
 pip install -r requirements.txt

2. Backend Internal Structure (backend/app/)
The app folder is the heart of the backend. It contains the API code, database logic, security layer, and configuration.
app/
 ├── core/
 ├── models/
 ├── routers/
 ├── schemas/
 ├── security/
 ├── config.py
 ├── database.py
 └── main.py


3. Core Application Files
main.py
This is the entry point of the backend. When FastAPI starts, this file runs.
 It:
Creates the FastAPI app


Registers all route files


Defines the server startup behavior


config.py
Loads environment settings (mainly from .env).
 Controls:
Database URL


JWT tokens


Debug mode


Any environment-specific values


database.py
Handles our database connection.
 It creates:
engine → connects to PostgreSQL


SessionLocal → used by routes to talk to the DB


Base → parent class for all ORM models


Every model imports Base, and every route uses SessionLocal to perform queries.

4. Core Utilities (core/ Folder)
settings.py
A centralized place for application configuration.
 Instead of hardcoding values across the project, we load them from here.
dependencies.py
Shared FastAPI dependency functions used across routes.
 Examples:
Get the current authenticated user


Inject a database session


Validate permissions


This folder helps keep route files clean.

5. Database Models (models/ Folder)
These files define our PostgreSQL tables using SQLAlchemy ORM.
 Each file generally represents one table.

user.py
The main User table.
 Fields:
id


email


role_id


admin_email (for business sub-users)


This table is the root for nearly all other tables.

role.py
Defines user roles:
Personal


Admin


Business


Sub-user


Used for permission checks.

auth_credentials.py
Stores all password-related information:
Hashed password


Algorithm used


Failed login attempts


Last failed login timestamp


This keeps sensitive auth info separate from basic user identity.

profiles.py
Holds extended user information like:
First/last name


Phone


Preferences


This keeps the User table clean and minimal.

categories.py
Stores user categories like:
Food


Bills


Groceries


Transportation


These categories help organize budgets, entries, and transactions.

budget.py
Represents an overall budget.
 Fields include:
Budget name


Total amount


Time period


user_id (ownership)



budget_entries.py
Individual line items inside a budget.
 For example, under a "January Budget" you might have:
Rent $500


Food $200


Groceries $120


Each entry links to a budget, category, and user.

transactions.py
General transactions a user logs.
 This is used to build dashboards, charts, and spending history.

goals.py
Stores user financial goals such as:
Save $800 for an emergency fund


Save for a PS5


Fields:
Target amount


Current progress


Due date


Status



llm_logs.py
Stores logs of interactions with the LLM feature.
 This is useful for analytics, debugging, or reviewing user patterns.

6. Security Layer (security/ Folder)
This folder handles all authentication and authorization logic for the app.

hashing.py
Responsible for hashing and verifying passwords.
 Ensures we never store plaintext passwords in the database.

jwt_handler.py
Creates JWT tokens during login.
 This includes:
Encoding user ID


Expiration times


Signing with secret key


All successful logins use this file.

jwt_utils.py
Utility functions for decoding and verifying JWTs.
 This is used in dependencies and routes that require authentication.

permissions.py
Handles role-based permissions.
 For example:
Only admins can view certain data


Sub-users must stay within their org


Users can only access their own resources


This supports RBAC (role-based access control).

7. Routers and Schemas

routers/
Each file in routers represents a group of related API endpoints.
 Examples:
auth.py → login / register


users.py → user operations


budgets.py → budget operations


transactions.py → financial data endpoints


Keeps routes clean and modular.
schemas/
Contains Pydantic models that validate request and response data.
 They ensure:
Data coming from frontend is in the correct format


Data returned to frontend is safe and structured


Schemas help our API stay predictable and consistent.

8. Additional Utility Files
__init__.py
Marks folders as Python packages.
 Allows imports like from app.models.user import User.
create_tables.py
A standalone script that runs once to create the database tables from the models.

9. Summary
In simple terms:
Models = define tables


Security = login, JWTs, hashing, permissions


Schemas = data validation


Routers = API endpoints


Database = connection to PostgreSQL


Core = app-wide utilities and settings


Main = starts the FastAPI server






