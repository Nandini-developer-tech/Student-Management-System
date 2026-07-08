const API = "https://student-management-system-1-kzyw.onrender.com";

// ================= AUTH CHECK =================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================= USERNAME =================

const username = localStorage.getItem("username");

if (username && document.getElementById("username")) {
    document.getElementById("username").innerHTML = username;
}

// ================= LOAD DASHBOARD =================

window.onload = function () {
    loadDashboard();
};

// ================= LOAD COUNTS =================

async function loadDashboard() {

    try {

        // Students
        const studentResponse = await fetch(API + "/students/");
        const students = await studentResponse.json();

        document.getElementById("studentCount").innerHTML = students.length;
        document.getElementById("quickStudents").innerHTML = students.length;

        // Faculty
        const facultyResponse = await fetch(API + "/faculty/");
        const faculty = await facultyResponse.json();

        document.getElementById("facultyCount").innerHTML = faculty.length;
        document.getElementById("quickFaculty").innerHTML = faculty.length;

        // Courses
        const courseResponse = await fetch(API + "/courses/");
        const courses = await courseResponse.json();

        document.getElementById("courseCount").innerHTML = courses.length;
        document.getElementById("quickCourses").innerHTML = courses.length;

        // Attendance
        const attendanceResponse = await fetch(API + "/attendance/");
        const attendance = await attendanceResponse.json();

        let present = attendance.filter(a => a.status === "Present").length;

        let percentage = 0;

        if (attendance.length > 0) {
            percentage = Math.round((present / attendance.length) * 100);
        }

        document.getElementById("attendanceCount").innerHTML = percentage + "%";
        document.getElementById("quickAttendance").innerHTML = percentage + "%";

        createChart(
            students.length,
            faculty.length,
            courses.length
        );

    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to load dashboard."
        });

    }

}

// ================= CHART =================

function createChart(studentCount, facultyCount, courseCount) {

    const ctx = document.getElementById("studentChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Students",
                "Faculty",
                "Courses"
            ],

            datasets: [{
                label: "Management Statistics",
                data: [
                    studentCount,
                    facultyCount,
                    courseCount
                ]
            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: true
                }

            }

        }

    });

}

// ================= LOGOUT =================

function logout() {

    Swal.fire({

        title: "Logout?",

        text: "Do you want to logout?",

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Logout"

    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.clear();

            window.location.href = "login.html";

        }

    });

}