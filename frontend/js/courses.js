const API = "http://127.0.0.1:8000";

// Load all courses
async function loadCourses() {

    try {

        const response = await fetch(API + "/courses/");

        const courses = await response.json();

        let rows = "";

        courses.forEach(course => {

            rows += `
                <tr>
                    <td>${course.id}</td>
                    <td>${course.course_name}</td>
                    <td>${course.duration}</td>
                    <td>${course.faculty_id}</td>

                    <td>

                        <button class="btn btn-warning btn-sm me-2"
                                onclick="editCourse(${course.id})">

                            <i class="fa fa-edit"></i>

                        </button>

                        <button class="btn btn-danger btn-sm"
                                onclick="deleteCourse(${course.id})">

                            <i class="fa fa-trash"></i>

                        </button>

                    </td>

                </tr>
            `;

        });

        document.getElementById("courseTable").innerHTML = rows;

    }

    catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Unable to load courses.",
            "error"
        );

    }

}



// Add Course

async function addCourse() {

    const course = {

        course_name: document.getElementById("course_name").value,

        duration: document.getElementById("duration").value,

        faculty_id: Number(document.getElementById("faculty_id").value)

    };

    try {

        const response = await fetch(API + "/courses/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(course)

        });

        const data = await response.json();

        if (response.ok) {

            Swal.fire(
                "Success",
                data.message,
                "success"
            );

            document.getElementById("course_name").value = "";
            document.getElementById("duration").value = "";
            document.getElementById("faculty_id").value = "";

            bootstrap.Modal.getInstance(
                document.getElementById("courseModal")
            ).hide();

            loadCourses();

        }

        else {

            Swal.fire(
                "Error",
                data.detail,
                "error"
            );

        }

    }

    catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Server connection failed.",
            "error"
        );

    }

}



// Delete Course

async function deleteCourse(id) {

    const result = await Swal.fire({

        title: "Delete Course?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Yes"

    });

    if (!result.isConfirmed)
        return;

    await fetch(API + "/courses/" + id, {

        method: "DELETE"

    });

    Swal.fire(
        "Deleted",
        "Course deleted successfully.",
        "success"
    );

    loadCourses();

}



// Edit Course

function editCourse(id) {

    Swal.fire(
        "Coming Soon",
        "Edit Course module will be implemented next.",
        "info"
    );

}



// Search

document.getElementById("search").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#courseTable tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});



// Logout

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}

// ---------------- USERNAME ----------------

const username = localStorage.getItem("username");

if (document.getElementById("username")) {

    document.getElementById("username").innerText =
        username ? "Welcome, " + username : "Admin";

}


// ---------------- LOGOUT ----------------

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}


// Load Courses
loadCourses();