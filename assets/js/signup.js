let accounts = [];

async function getCsrfToken() {
    const response = await fetch('http://localhost:8000/api/csrf-token/', {
        credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
}

/**
 * this function is used to save the account information from the signup page and redirect the user back to the login page
 */
async function prepareSignUp() {
    const csrfToken = await getCsrfToken();
    localStorage.setItem('token', csrfToken);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-CSRFToken", csrfToken);

    const raw = JSON.stringify({
        "username": document.getElementById('input-name').value,
        "email": document.getElementById('input-email').value,
        "password": document.getElementById('input-password').value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        credentials: 'include',
        body: raw,
        redirect: "follow",
    };

    await signUp(requestOptions);
}

async function signUp(requestOptions) {
    try {
        let resp = await fetch("http://localhost:8000/api/register/", requestOptions);
        if (!resp.ok) {
            displayWrongData();
            clearSignupInputs();
            throw new Error(`HTTP error! status: ${resp.status}`);
        } else {
            redirectToLogin();
        }
    } catch (e) {
        console.error("Error during sign-up:", e);
        displayWrongData();
        clearSignupInputs();
    }
}

/**
 * this function lets the user know that they put in the wrong data in the input field
 */
function displayWrongData() {
    document.getElementById('input-confirm-password').classList.add('red-input');
    document.getElementById('wrong-password').classList.remove('d-none');
}

/**
 * this function redirects the user to the login page
 */
async function redirectToLogin() {
    location.href = "login.html";
}

/**
 * this function is used to clear the Input fields from the Sign up page
 */
function clearSignupInputs() {
    document.getElementById('input-name').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
    document.getElementById('input-confirm-password').value = '';
}