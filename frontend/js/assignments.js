const API_URL = "http://127.0.0.1:8000/assignments";

let editId = null;

// Load data when page opens
window.onload = function () {
    loadAssignments();
};


// Add / Update Assignment
document.getElementById("assignmentForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const assignment = {
        faculty_id: parseInt(document.getElementById("faculty_id").value),
        course_id: parseInt(document.getElementById("course_id").value)
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
        body: JSON.stringify(assignment)
    });

    if (response.ok) {

        Swal.fire({
            icon: "success",
            title: "Success",
            text: editId === null
                ? "Assignment created successfully!"
                : "Assignment updated successfully!"
        });

        document.getElementById("assignmentForm").reset();
        editId = null;

        loadAssignments();

    } else {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Operation failed."
        });

    }

});


// Load Assignments
async function loadAssignments() {

    const response = await fetch(API_URL + "/");
    const data = await response.json();

    let rows = "";

    data.forEach(item => {

        rows += `
        <tr>

            <td>${item.id}</td>
            <td>${item.faculty_id}</td>
            <td>${item.course_id}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editAssignment(${item.id}, ${item.faculty_id}, ${item.course_id})">

                    <i class="fa fa-edit"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteAssignment(${item.id})">

                    <i class="fa fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.getElementById("assignmentTable").innerHTML = rows;
}


// Edit Assignment
function editAssignment(id, faculty, course) {

    editId = id;

    document.getElementById("faculty_id").value = faculty;
    document.getElementById("course_id").value = course;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Delete Assignment
async function deleteAssignment(id) {

    const result = await Swal.fire({
        title: "Delete Assignment?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete"
    });

    if (!result.isConfirmed)
        return;

    const response = await fetch(API_URL + "/" + id, {
        method: "DELETE"
    });

    if (response.ok) {

        Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Assignment deleted successfully."
        });

        loadAssignments();

    }

}