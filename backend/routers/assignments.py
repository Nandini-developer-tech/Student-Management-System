from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
import models
import schemas

router = APIRouter(
    prefix="/assignments",
    tags=["Faculty Course Assignments"]
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Assignment
@router.post("/")
def create_assignment(
    assignment: schemas.FacultyCourseAssignmentCreate,
    db: Session = Depends(get_db)
):
    new_assignment = models.FacultyCourseAssignment(
        faculty_id=assignment.faculty_id,
        course_id=assignment.course_id
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return new_assignment


# Get All Assignments
@router.get("/")
def get_assignments(db: Session = Depends(get_db)):
    return db.query(models.FacultyCourseAssignment).all()


# Update Assignment
@router.put("/{assignment_id}")
def update_assignment(
    assignment_id: int,
    assignment: schemas.FacultyCourseAssignmentCreate,
    db: Session = Depends(get_db)
):
    data = db.query(models.FacultyCourseAssignment).filter(
        models.FacultyCourseAssignment.id == assignment_id
    ).first()

    if not data:
        return {"message": "Assignment not found"}

    data.faculty_id = assignment.faculty_id
    data.course_id = assignment.course_id

    db.commit()

    return {"message": "Assignment updated successfully"}


# Delete Assignment
@router.delete("/{assignment_id}")
def delete_assignment(
    assignment_id: int,
    db: Session = Depends(get_db)
):
    data = db.query(models.FacultyCourseAssignment).filter(
        models.FacultyCourseAssignment.id == assignment_id
    ).first()

    if not data:
        return {"message": "Assignment not found"}

    db.delete(data)
    db.commit()

    return {"message": "Assignment deleted successfully"}