from sqlalchemy import Column, Integer, String, ForeignKey, Date, TIMESTAMP
from sqlalchemy.sql import func
from database import Base


# ------------------ User ------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True)
    password = Column(String(255))
    role = Column(String(50))


# ------------------ Faculty ------------------

class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    faculty_name = Column(String(100))
    email = Column(String(100))
    department = Column(String(100))


# ------------------ Course ------------------

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String(100))
    duration = Column(String(50))
    faculty_id = Column(Integer, ForeignKey("faculty.id"))


# ------------------ Student ------------------

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    course_id = Column(Integer, ForeignKey("courses.id"))
    year = Column(Integer)


# ------------------ Attendance ------------------

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    attendance_date = Column(Date)
    status = Column(String(20))


# ------------------ Faculty Course Assignment ------------------

class FacultyCourseAssignment(Base):
    __tablename__ = "faculty_course_assignments"

    id = Column(Integer, primary_key=True, index=True)
    faculty_id = Column(Integer, ForeignKey("faculty.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))


# ------------------ Audit Log ------------------

class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String(50))
    table_name = Column(String(100))
    record_id = Column(Integer)
    action_time = Column(TIMESTAMP, server_default=func.now())