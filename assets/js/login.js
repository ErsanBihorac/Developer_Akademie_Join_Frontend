/**
 * this function is used to log in the person. it checks if the email and password exists.
 *  If the email and password are valid. the user gets logged in and redirected to the summary page
 */
async function prepareLoginWithUsernameAndPassword() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": document.getElementById('input-email').value,
        "password": document.getElementById('input-password').value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await loginWithUsernameAndPassword(requestOptions);
    clearLoginInputs();
}

async function loginWithUsernameAndPassword(requestOptions) {
    try {
        let resp = await fetch("http://localhost:8000/api/login/", requestOptions);
        let json = await resp.json();
        setLocalStorageItems(json);
        resp.status == 200 ? redirectToSummary() : inputValidation();
    } catch (e) {
        console.error(e);
        inputValidation();
    }
}

function setLocalStorageItems(json) {
    localStorage.setItem('token', json.token);
    localStorage.setItem('firstLetter', `"${idLetter(json.username)}"`);
    localStorage.setItem('name', `"${json.username}"`);
}

function idLetter(str) {
    let name = str;
    let words = name.split(" ");
    let firstWord = words[0];
    let firstLetter = firstWord.substring(0, 1).toUpperCase();
    return firstLetter;
}

function inputValidation() {
    document.getElementById('input-password').classList.add('red-input');
    document.getElementById('wrong-password').classList.remove('d-none');
}

/**
 * this function logs the user in as a guest
 */
function guestLogin() {
    setArray('name', 'Guest');
    setArray('firstLetter', 'GU');
    redirectToSummary();
}

/**
 * this function is used to clear the Input fields from the login page
 */
function clearLoginInputs() {
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
}

/**
 * this function redirects the user to the summary page
 */
function redirectToSummary() {
    location.href = "summary.html";
}

/**
 * this function redirects the user to the sing up page
 */
function redirectToSignUp() {
    location.href = "signup.html";
}