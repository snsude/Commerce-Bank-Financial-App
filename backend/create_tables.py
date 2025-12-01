from app.database import engine, Base
from app.models.user import User
from app.models.auth_credentials import AuthCredentials
from app.models.role import Role

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done!")
