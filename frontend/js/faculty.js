// ================= API =================
const API = "https://student-management-system-1-kzyw.onrender.com";

// ================= AUTH =================
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ================= USERNAME =================
const username = localStorage.getItem("username");

if (document.getElementById("username")) {
    document.getElementById("username").innerText =
        username ? "Welcome, " + username : "Admin";
}

// ================= LOAD FACULTY =================
async function loadFaculty() {

    try {

        const response = await fetch(API + "/faculty/", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

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

    }

    catch (error) {

        console.error(error);

        Swal.fire(
            "Error",
            "Unable to load faculty.",
            "error"
        );

    }

}

// ================= ADD FACULTY =================
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

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token

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

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("facultyModal")
            );

            if (modal) modal.hide();

            loadFaculty();

        }

        else {

            Swal.fire(
                "Error",
                data.detail || "Unable to add faculty.",
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

// ================= DELETE FACULTY =================
async function deleteFaculty(id) {

    const result = await Swal.fire({

        title: "Delete Faculty?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete"

    });

    if (!result.isConfirmed) return;

    try {

        await fetch(API + "/faculty/" + id, {

            method: "DELETE",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        Swal.fire(
            "Deleted",
            "Faculty deleted successfully.",
            "success"
        );

        loadFaculty();

    }

    catch (error) {

        Swal.fire(
            "Error",
            "Unable to delete faculty.",
            "error"
        );

    }

}

// ================= EDIT FACULTY =================
function editFaculty(id) {

    Swal.fire(
        "Coming Soon",
        "Edit Faculty module will be implemented next.",
        "info"
    );

}

// ================= SEARCH =================
document.getElementById("search").addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#facultyTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

});

// ================= LOGOUT =================
function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}

// ================= LOAD PAGE =================
loadFaculty();