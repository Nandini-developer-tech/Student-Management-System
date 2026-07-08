from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
import models

# Import Routers
from routers import users
from routers import students
from routers import faculty
from routers import courses
from routers import attendance
from routers import assignments

# Create FastAPI App
app = FastAPI(
    title="Student Management System API",
    version="1.0.0",
    description="Student Management System using FastAPI, SQLAlchemy and MySQL"
)

# Create Database Tables
models.Base.metadata.create_all(bind=engine)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "🎓 Student Management System API is Running Successfully!"
    }

# Include Routers
app.include_router(users.router)
app.include_router(students.router)
app.include_router(faculty.router)
app.include_router(courses.router)
app.include_router(attendance.router)
app.include_router(assignments.router)
