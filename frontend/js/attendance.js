const API = "https://student-management-system-1-kzyw.onrender.com";
const API_URL = API + "/attendance";

let editId = null;

// Load attendance when page opens
window.onload = function () {
    loadAttendance();
};

// Add / Update Attendance
document.getElementById("attendanceForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const attendance = {
        student_id: parseInt(document.getElementById("student_id").value),
        course_id: parseInt(document.getElementById("course_id").value),
        attendance_date: document.getElementById("attendance_date").value,
        status: document.getElementById("status").value
    };

    let url = API_URL + "/";
    let method = "POST";

    if (editId !== null) {
        url = API_URL + "/" + editId;
        method = "PUT";
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(attendance)
    });

    if (response.ok) {

        Swal.fire({
            icon: "success",
            title: "Success",
            text: editId === null
                ? "Attendance marked successfully!"
                : "Attendance updated successfully!"
        });

        document.getElementById("attendanceForm").reset();
        editId = null;

        loadAttendance();

    } else {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Operation failed."
        });

    }

});


// Load Attendance
async function loadAttendance() {

    const response = await fetch(API_URL + "/");
    const data = await response.json();

    let rows = "";

    data.forEach(item => {

        rows += `
        <tr>
            <td>${item.id}</td>
            <td>${item.student_id}</td>
            <td>${item.course_id}</td>
            <td>${item.attendance_date}</td>
            <td>
                <span class="badge ${item.status === "Present" ? "bg-success" : "bg-danger"}">
                    ${item.status}
                </span>
            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editAttendance(${item.id},
                    ${item.student_id},
                    ${item.course_id},
                    '${item.attendance_date}',
                    '${item.status}')">

                    <i class="fa fa-edit"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteAttendance(${item.id})">

                    <i class="fa fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("attendanceTable").innerHTML = rows;
}



// Edit Attendance
function editAttendance(id, student, course, date, status) {

    editId = id;

    document.getElementById("student_id").value = student;
    document.getElementById("course_id").value = course;
    document.getElementById("attendance_date").value = date;
    document.getElementById("status").value = status;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// Delete Attendance
async function deleteAttendance(id) {

    const result = await Swal.fire({

        title: "Delete Attendance?",
        text: "You won't be able to recover it!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete"

    });

    if (!result.isConfirmed)
        return;

    const response = await fetch(API_URL + "/" + id, {

        method: "DELETE"

    });

    if (response.ok) {

        Swal.fire({

            icon: "success",
            title: "Deleted!",
            text: "Attendance deleted successfully."

        });

        loadAttendance();

    }

}



// Search Attendance
document.getElementById("searchAttendance").addEventListener("keyup", function () {

    let filter = this.value.toLowerCase();

    let rows = document.querySelectorAll("#attendanceTable tr");

    rows.forEach(row => {

        let student = row.cells[1].innerText.toLowerCase();

        if (student.includes(filter)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

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