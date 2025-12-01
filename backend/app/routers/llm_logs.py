from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.llm_logs import LLMLog
from backend.app.schemas.llm_logs import LLMLogCreate, LLMLogOut
from backend.app.models.user import User

router = APIRouter(prefix="/llm-logs", tags=["LLM Logs"])



@router.post("/", response_model=LLMLogOut)
def create_log(
    payload: LLMLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    log = LLMLog(
        user_id=current_user.id,
        session_id=payload.session_id,
        prompt=payload.prompt,
        response=payload.response
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log



@router.get("/", response_model=list[LLMLogOut])
def list_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(LLMLog)
        .filter(LLMLog.user_id == current_user.id)
        .order_by(LLMLog.timestamp.asc())
        .all()
    )
