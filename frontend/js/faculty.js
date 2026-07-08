const API = "http://127.0.0.1:8000";

// Load all faculty
async function loadFaculty() {

    try {

        const response = await fetch(API + "/faculty/");

        const faculty = await response.json();

        let rows = "";

        faculty.forEach(item => {

            rows += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.faculty_name}</td>
                    <td>${item.email}</td>
                    <td>${item.department}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2"
                                onclick="editFaculty(${item.id})">
                            <i class="fa fa-edit"></i>
                        </button>

                        <button class="btn btn-danger btn-sm"
                                onclick="deleteFaculty(${item.id})">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;

        });

        document.getElementById("facultyTable").innerHTML = rows;

    } catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Unable to load faculty.",
            "error"
        );

    }

}


// Add Faculty
async function addFaculty() {

    const faculty = {

        faculty_name: document.getElementById("faculty_name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value

    };

    try {

        const response = await fetch(API + "/faculty/", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(faculty)

        });

        const data = await response.json();

        if (response.ok) {

            Swal.fire(
                "Success",
                data.message,
                "success"
            );

            document.getElementById("faculty_name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("department").value = "";

            bootstrap.Modal.getInstance(
                document.getElementById("facultyModal")
            ).hide();

            loadFaculty();

        } else {

            Swal.fire(
                "Error",
                data.detail,
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Server connection failed.",
            "error"
        );

    }

}


// Delete Faculty
async function deleteFaculty(id) {

    if (!confirm("Delete this faculty?")) return;

    await fetch(API + "/faculty/" + id, {

        method: "DELETE"

    });

    loadFaculty();

}


// Edit Faculty
function editFaculty(id) {

    Swal.fire(
        "Coming Soon",
        "Edit Faculty will be implemented next.",
        "info"
    );

}


// Logout
function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}


// Search Faculty
document.getElementById("search").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#facultyTable tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});

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


// Load Faculty
loadFaculty();