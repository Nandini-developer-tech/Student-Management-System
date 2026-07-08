from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
import models
import schemas

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    new_attendance = models.Attendance(**attendance.dict())
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance


@router.get("/")
def get_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()


@router.put("/{attendance_id}")
def update_attendance(attendance_id: int, attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()

    if not record:
        return {"message": "Attendance not found"}

    record.student_id = attendance.student_id
    record.course_id = attendance.course_id
    record.attendance_date = attendance.attendance_date
    record.status = attendance.status

    db.commit()

    return {"message": "Attendance updated successfully"}


@router.delete("/{attendance_id}")
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    record = db.query(models.Attendance).filter(models.Attendance.id == attendance_id).first()

    if not record:
        return {"message": "Attendance not found"}

    db.delete(record)
    db.commit()

    return {"message": "Attendance deleted successfully"}