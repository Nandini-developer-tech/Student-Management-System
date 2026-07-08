from pydantic import BaseModel
from datetime import date


# ------------------ User ------------------

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str


# ------------------ Student ------------------

class StudentCreate(BaseModel):
    student_name: str
    email: str
    phone: str
    course_id: int
    year: int


class StudentResponse(StudentCreate):
    id: int

    class Config:
        from_attributes = True


# ------------------ Faculty ------------------

class FacultyCreate(BaseModel):
    faculty_name: str
    email: str
    department: str


class FacultyResponse(FacultyCreate):
    id: int

    class Config:
        from_attributes = True


# ------------------ Course ------------------

class CourseCreate(BaseModel):
    course_name: str
    duration: str
    faculty_id: int


class CourseResponse(CourseCreate):
    id: int

    class Config:
        from_attributes = True


# ------------------ Attendance ------------------

class AttendanceCreate(BaseModel):
    student_id: int
    course_id: int
    attendance_date: date
    status: str


class AttendanceResponse(AttendanceCreate):
    id: int

    class Config:
        from_attributes = True


# ------------------ Faculty Course Assignment ------------------

class FacultyCourseAssignmentCreate(BaseModel):
    faculty_id: int
    course_id: int


class FacultyCourseAssignmentResponse(FacultyCourseAssignmentCreate):
    id: int

    class Config:
        from_attributes = True