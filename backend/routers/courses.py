from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

# Get all courses
@router.get("/")
def get_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()

# Get course by ID
@router.get("/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(
        models.Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return course

# Add course
@router.post("/")
def add_course(course: schemas.CourseCreate,
               db: Session = Depends(get_db)):

    new_course = models.Course(
        course_name=course.course_name,
        duration=course.duration,
        faculty_id=course.faculty_id
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return {
        "message": "Course Added Successfully",
        "course": new_course
    }

# Update course
@router.put("/{course_id}")
def update_course(course_id: int,
                  course: schemas.CourseCreate,
                  db: Session = Depends(get_db)):

    existing = db.query(models.Course).filter(
        models.Course.id == course_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Course not found")

    existing.course_name = course.course_name
    existing.duration = course.duration
    existing.faculty_id = course.faculty_id

    db.commit()

    return {"message": "Course Updated Successfully"}

# Delete course
@router.delete("/{course_id}")
def delete_course(course_id: int,
                  db: Session = Depends(get_db)):

    course = db.query(models.Course).filter(
        models.Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    db.delete(course)
    db.commit()

    return {"message": "Course Deleted Successfully"}