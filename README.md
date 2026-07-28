# 🎓 Student Management System   

A full-stack Student Management System developed using **FastAPI**, **SQLAlchemy**, **MySQL**, **HTML**, **CSS**, **Bootstrap**, and **JavaScript**. This application helps manage students, faculty, courses, attendance, and user authentication through a modern web interface.  
     
---

## 🚀 Features

### 🔐 Authentication            
- User Registration   
- User Login
- Logout
- Session Management using Local Storage        

### 👨‍🎓 Student Management
- Add Student
- View Students
- Update Student
- Delete Student
- Search Students
- Import Students using CSV

### 👨‍🏫 Faculty Management   
- Add Faculty
- View Faculty
- Update Faculty
- Delete Faculty
- Search Faculty

### 📚 Course Management
- Add Course
- View Courses
- Update Course
- Delete Course
- Search Courses

### 📅 Attendance Management
- Mark Attendance
- View Attendance
- Update Attendance
- Delete Attendance

### 📊 Dashboard
- Total Students
- Total Faculty
- Total Courses
- Attendance Percentage
- Statistics Chart
- Responsive Dashboard

---

## 🛠️ Technologies Used

### Backend
- Python
- FastAPI
- SQLAlchemy
- MySQL
- Uvicorn

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Chart.js
- SweetAlert2
- Font Awesome

---

## 📁 Project Structure

```
Student-Management-System
│
├── backend
│   ├── routers
│   │   ├── users.py
│   │   ├── students.py
│   │   ├── faculty.py
│   │   ├── courses.py
│   │   ├── attendance.py
│   │   └── assignments.py
│   │
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   ├── auth.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── css
│   ├── js
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── students.html
│   ├── faculty.html
│   ├── courses.html
│   ├── attendance.html
│   └── assignments.html
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Student-Management-System.git
```

### Move into Project

```bash
cd Student-Management-System
```

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## 🗄️ Database Setup

1. Install MySQL.
2. Create a database.

```sql
CREATE DATABASE student_management;
```

3. Update the database connection in `database.py`.

---

## ▶️ Run Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend API:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## ▶️ Run Frontend

Open the `frontend` folder.

Run `login.html` using Live Server in VS Code or any local web server.

---

## 📸 Screenshots

### Login Page

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Student Management

(Add Screenshot)

### Faculty Management

(Add Screenshot)

### Course Management

(Add Screenshot)

### Attendance Management

(Add Screenshot)

---

## 📌 API Endpoints

### Users
- POST `/users/register`
- POST `/users/login`

### Students
- GET `/students`
- POST `/students`
- PUT `/students/{id}`
- DELETE `/students/{id}`

### Faculty
- GET `/faculty`
- POST `/faculty`
- PUT `/faculty/{id}`
- DELETE `/faculty/{id}`

### Courses
- GET `/courses`
- POST `/courses`
- PUT `/courses/{id}`
- DELETE `/courses/{id}`

### Attendance
- GET `/attendance`
- POST `/attendance`
- PUT `/attendance/{id}`
- DELETE `/attendance/{id}`

---

## 🎯 Future Enhancements

- Export Reports to PDF
- Email Notifications
- Role-Based Access Control
- Dashboard Analytics
- Student Profile Photos
- JWT Protected Routes
- Deployment on Cloud

---

## 👩‍💻 Developer

**Narigammagari Nandini**

Python Full Stack Developer

### Skills
- Python
- FastAPI
- SQLAlchemy
- MySQL
- HTML
- CSS
- Bootstrap
- JavaScript

---

## ⭐ If you like this project

Please give this repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and learning purposes.


## 🚀 Live Demo

### Frontend
🔗 https://student-management-frontend-cvsy.onrender.com/login.html

### Backend API
🔗 https://student-management-system-1-kzyw.onrender.com

### API Documentation (Swagger)
🔗 https://student-management-system-1-kzyw.onrender.com/docs
