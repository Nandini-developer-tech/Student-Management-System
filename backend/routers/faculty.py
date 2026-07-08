from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"]
)


@router.get("/")
def get_faculty(db: Session = Depends(get_db)):
    return db.query(models.Faculty).all()


@router.get("/{faculty_id}")
def get_faculty_by_id(faculty_id: int, db: Session = Depends(get_db)):
    faculty = db.query(models.Faculty).filter(
        models.Faculty.id == faculty_id
    ).first()

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    return faculty


@router.post("/")
def add_faculty(faculty: schemas.FacultyCreate,
                db: Session = Depends(get_db)):

    new_faculty = models.Faculty(
        faculty_name=faculty.faculty_name,
        email=faculty.email,
        department=faculty.department
    )

    db.add(new_faculty)
    db.commit()
    db.refresh(new_faculty)

    return {
        "message": "Faculty Added Successfully",
        "faculty": new_faculty
    }


@router.put("/{faculty_id}")
def update_faculty(
        faculty_id: int,
        faculty: schemas.FacultyCreate,
        db: Session = Depends(get_db)):

    existing = db.query(models.Faculty).filter(
        models.Faculty.id == faculty_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Faculty not found")

    existing.faculty_name = faculty.faculty_name
    existing.email = faculty.email
    existing.department = faculty.department

    db.commit()

    return {"message": "Faculty Updated Successfully"}


@router.delete("/{faculty_id}")
def delete_faculty(faculty_id: int,
                   db: Session = Depends(get_db)):

    faculty = db.query(models.Faculty).filter(
        models.Faculty.id == faculty_id
    ).first()

    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    db.delete(faculty)
    db.commit()

    return {"message": "Faculty Deleted Successfully"}