from reportlab.platypus import SimpleDocTemplate, Table
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from openpyxl import Workbook
import pandas as pd

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


# ---------------- GET ALL STUDENTS ---------------- #

@router.get("/")
def get_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()


# ---------------- GET SINGLE STUDENT ---------------- #

@router.get("/{student_id}")
def get_student(student_id: int, db: Session = Depends(get_db)):

    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    return student


# ---------------- ADD STUDENT ---------------- #

@router.post("/")
def add_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db)
):

    new_student = models.Student(
        student_name=student.student_name,
        email=student.email,
        phone=student.phone,
        course_id=student.course_id,
        year=student.year
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student Added Successfully",
        "student": new_student
    }


# ---------------- UPDATE STUDENT ---------------- #

@router.put("/{student_id}")
def update_student(
    student_id: int,
    student: schemas.StudentCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    existing.student_name = student.student_name
    existing.email = student.email
    existing.phone = student.phone
    existing.course_id = student.course_id
    existing.year = student.year

    db.commit()
    db.refresh(existing)

    return {
        "message": "Student Updated Successfully",
        "student": existing
    }


# ---------------- DELETE STUDENT ---------------- #

@router.delete("/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student Deleted Successfully"
    }


# ---------------- IMPORT STUDENTS FROM CSV ---------------- #

@router.post("/import")
async def import_students(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        df = pd.read_csv(file.file)

        required_columns = [
            "student_name",
            "email",
            "phone",
            "course_id",
            "year"
        ]

        for column in required_columns:
            if column not in df.columns:
                raise HTTPException(
                    status_code=400,
                    detail=f"Missing column: {column}"
                )

        for _, row in df.iterrows():

            student = models.Student(
                student_name=row["student_name"],
                email=row["email"],
                phone=str(row["phone"]),
                course_id=int(row["course_id"]),
                year=int(row["year"])
            )

            db.add(student)

        db.commit()

        return {
            "message": "Students Imported Successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ---------------- EXPORT STUDENTS TO EXCEL ---------------- #

@router.get("/export/excel")
def export_students_excel(db: Session = Depends(get_db)):

    students = db.query(models.Student).all()

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Students"

    # Header Row
    sheet.append([
        "ID",
        "Student Name",
        "Email",
        "Phone",
        "Course ID",
        "Year"
    ])

    # Data Rows
    for student in students:
        sheet.append([
            student.id,
            student.student_name,
            student.email,
            student.phone,
            student.course_id,
            student.year
        ])

    filename = "students.xlsx"
    workbook.save(filename)

    return FileResponse(
        path=filename,
        filename="students.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
@router.get("/export/pdf")
def export_students_pdf(db: Session = Depends(get_db)):

    students = db.query(models.Student).all()

    filename = "students.pdf"

    pdf = SimpleDocTemplate(filename)

    data = []

    data.append([
        "ID",
        "Name",
        "Email",
        "Phone",
        "Course",
        "Year"
    ])

    for student in students:

        data.append([
            student.id,
            student.student_name,
            student.email,
            student.phone,
            student.course_id,
            student.year
        ])

    table = Table(data)

    pdf.build([table])

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename="students.pdf"
    )