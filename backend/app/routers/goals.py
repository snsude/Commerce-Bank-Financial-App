from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from database import get_db
from core.dependencies import get_current_user
from models.goals import Goal
from schemas.goals import GoalCreate, GoalUpdate, GoalOut
from models.user import User

router = APIRouter(prefix="/goals", tags=["Goals"])


@router.post("/", response_model=GoalOut)
def create_goal(
    payload: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Validate goal type
    if payload.type not in ["savings", "debt_paydown"]:
        raise HTTPException(
            status_code=400, 
            detail="Goal type must be 'savings' or 'debt_paydown'"
        )
    
    goal = Goal(
        user_id=current_user.id,
        name=payload.name,
        type=payload.type,
        target_amount=payload.target_amount,
        current_amount=payload.current_amount,
        target_date=payload.target_date,
        status=payload.status or "on track",
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
        .order_by(Goal.created_at.desc())
        .all()
    )


@router.get("/{goal_id}", response_model=GoalOut)
def get_goal(
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
    
    return goal


@router.put("/{goal_id}", response_model=GoalOut)
def update_goal(
    goal_id: int,
    updates: GoalUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    # Update fields
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(goal, key, value)

    # Auto update status based on progress
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


@router.patch("/{goal_id}/progress", response_model=GoalOut)
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