const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link"),
    loginButton = document.getElementById("loginButton"),
    registrationButton = document.getElementById("registrationButton");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

signUp.addEventListener("click", () => {
    container.classList.add("active");
});

login.addEventListener("click", () => {
    container.classList.remove("active");
});

loginButton.addEventListener("click", function () {
    const loginName = document.getElementById("loginName").value,
        loginPassword = document.getElementById("loginPassword").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            login: loginName,
            password: loginPassword
        })
    })
        .then(response => response.text())
        .then(data => {
            const messageType = data === 'Login successfully' ? 'success' : 'error';

            if (messageType === 'success') {
                window.location.href = '/game';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

registrationButton.addEventListener("click", function () {
    const login = document.getElementById('name').value,
        password = document.getElementById('password').value,
        confirmPassword = document.getElementById('confirmPassword').value,
        email = document.getElementById('email').value;

    if (password !== confirmPassword) {
        console.log("Password mismatch");
        return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        console.log("Invalid email format");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            login: login,
            password: password,
            email: email
        })
    })
        .then(response => response.text())
        .then(data => {
            const messageType = data === 'User created successfully' ? 'success' : 'error';

            console.log(data);

            if (messageType === 'success') {
                container.classList.remove("active");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage('An error occurred.', 'error');
        });
});