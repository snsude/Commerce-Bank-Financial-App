from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from ..security.jwt_utils import decode_access_token
from ..models.user import User
from ..database import get_db

# Changed from OAuth2PasswordBearer to HTTPBearer
security = HTTPBearer()


def get_current_user(
    credentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Get current user from JWT token
    UPDATED: Now expects email in token's 'sub' field (not user_id)
    """
    try:
        # Get token from credentials
        token = credentials.credentials
        
        # Decode the token
        payload = decode_access_token(token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
            )

        # Extract email from token (YOUR backend uses email in 'sub')
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token missing user info",
            )

        # Look up user by email (not ID)
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return user
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )