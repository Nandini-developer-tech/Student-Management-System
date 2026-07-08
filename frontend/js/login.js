console.log("Login JS Loaded");

const API = "http://127.0.0.1:8000";

document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    console.log("Sending Login Request:", user);

    try {

        const response = await fetch(API + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        console.log("Response Status:", response.status);

        const data = await response.json();

        console.log("Response Data:", data);

        if (response.ok) {

            localStorage.setItem("token", data.access_token || "");
            localStorage.setItem("username", data.username || user.username);
            localStorage.setItem("role", data.role || "Admin");

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome " + (data.username || user.username),
                timer: 1500,
                showConfirmButton: false
            }).then(() => {

                window.location.href = "dashboard.html";

            });

        } else {

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: data.detail || "Invalid Username or Password"
            });

        }

    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Unable to connect to the server."
        });

    }

});