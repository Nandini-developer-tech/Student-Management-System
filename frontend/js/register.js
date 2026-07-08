const API = "http://127.0.0.1:8000";

document.getElementById("registerForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const user = {

        username: document.getElementById("username").value,

        password: document.getElementById("password").value,

        role: document.getElementById("role").value

    };

    try{

        const response = await fetch(API + "/users/register",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(user)

        });

        const data = await response.json();

        if(response.ok){

            Swal.fire({

                icon:"success",

                title:"Registration Successful",

                text:data.message,

                timer:1500,

                showConfirmButton:false

            }).then(()=>{

                window.location.href="login.html";

            });

        }

        else{

            Swal.fire({

                icon:"error",

                title:"Registration Failed",

                text:data.detail

            });

        }

    }

    catch(error){

        Swal.fire({

            icon:"error",

            title:"Server Error",

            text:"Unable to connect to server."

        });

    }

});