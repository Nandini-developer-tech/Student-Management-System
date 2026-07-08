const API = "http://127.0.0.1:8000";

// Load students when page opens
window.onload = function () {
    loadStudents();
};

// ================= LOAD STUDENTS =================

async function loadStudents() {

    try {

        const response = await fetch(API + "/students/");

        if (!response.ok) {
            throw new Error("Failed to fetch students.");
        }

        const students = await response.json();

        let rows = "";

        students.forEach(student => {

            rows += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.student_name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.course_id}</td>
                    <td>${student.year}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-1"
                            onclick="editStudent(${student.id})">

                            <i class="fa fa-edit"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteStudent(${student.id})">

                            <i class="fa fa-trash"></i>

                        </button>

                    </td>

                </tr>
            `;

        });

        document.getElementById("studentTable").innerHTML = rows;

    }

    catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Unable to load students.",
            "error"
        );

    }

}

// ================= ADD STUDENT =================

async function addStudent() {

    const student = {

        student_name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        course_id: Number(document.getElementById("course").value),

        year: Number(document.getElementById("year").value)

    };

    try {

        const response = await fetch(API + "/students/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(student)

        });

        if (response.ok) {

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Student Added Successfully!"

            });

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("course").value = "";
            document.getElementById("year").value = "";

            const modalElement = document.getElementById("studentModal");

            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            loadStudents();

        }

        else {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to add student."

            });

        }

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Error",

            text: "Something went wrong."

        });

    }

}

// ================= DELETE STUDENT =================

async function deleteStudent(id) {

    const result = await Swal.fire({

        title: "Delete Student?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Delete"

    });

    if (!result.isConfirmed) return;

    try {

        const response = await fetch(API + "/students/" + id, {

            method: "DELETE"

        });

        if (response.ok) {

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Student deleted successfully."

            });

            loadStudents();

        }

        else {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Delete failed."

            });

        }

    }

    catch (error) {

        console.error(error);

    }

}

// ================= EDIT STUDENT =================

function editStudent(id) {

    Swal.fire({

        icon: "info",

        title: "Edit Module",

        text: "Edit Student feature will be implemented next."

    });

}

// ================= SEARCH STUDENT =================

document.getElementById("searchStudent").addEventListener("keyup", function () {

    const filter = this.value.toLowerCase();

    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {

        const studentName = row.cells[1].innerText.toLowerCase();

        if (studentName.includes(filter)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});

// ================= EXPORT EXCEL =================

function exportExcel() {

    window.open(API + "/students/export/excel", "_blank");

}

// ================= EXPORT PDF =================

function exportPDF() {

    window.open(
        API + "/students/export/pdf",
        "_blank"
    );

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