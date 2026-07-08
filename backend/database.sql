CREATE DATABASE student_management;

USE student_management;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE faculty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(100)
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100),
    duration VARCHAR(50),
    faculty_id INT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id)
);

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    course_id INT,
    year INT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    attendance_date DATE,
    status VARCHAR(20),
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(course_id) REFERENCES courses(id)
);

CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(50),
    table_name VARCHAR(100),
    record_id INT,
    action_time DATETIME DEFAULT CURRENT_TIMESTAMP
);