from fastapi import APIRouter, Depends, HTTPException 
from sqlalchemy.orm import Session
from datetime import date

from backend.app.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.goals import Goal
from backend.app.schemas.goals import GoalCreate, GoalOut
from backend.app.models.user import User

router = APIRouter(prefix="/goals", tags=["Goals"])



@router.post("/", response_model=GoalOut)
def create_goal(
    payload: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    goal = Goal(
        user_id=current_user.id,
        name=payload.name,
        type=payload.type,
        target_amount=payload.target_amount,
        current_amount=payload.current_amount,
        target_date=payload.target_date,
        status="on track",
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal



@router.get("/", response_model=list[GoalOut])
def list_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Goal)
        .filter(Goal.user_id == current_user.id)
        .all()
    )



@router.patch("/{goal_id}", response_model=GoalOut)
def update_progress(
    goal_id: int,
    current_amount: float,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.current_amount = current_amount

    # Auto update status
    if goal.current_amount >= goal.target_amount:
        goal.status = "completed"
    elif goal.target_date:
        if date.today() > goal.target_date:
            goal.status = "behind"
        else:
            goal.status = "on track"

    db.commit()
    db.refresh(goal)
    return goal



@router.delete("/{goal_id}")
def delete_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    db.delete(goal)
    db.commit()
    return {"message": "Goal deleted"}
