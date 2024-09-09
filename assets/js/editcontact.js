/**
 * this function saves the contact values in the remote storage and redirects the user to the contacts page
 * @param {index} i -index 
 */
async function saveContactValues(i) {
    const updatedData = contactValue(i);
    const csrfToken = localStorage.getItem('csrfToken');

    await fetch(`http://localhost:8000/api/contacts/${contacts[i].id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Cookie': `csrftoken=${csrfToken}`
        },
        body: JSON.stringify(updatedData)
    }).then(response => {
        if (!response.ok)
            console.log('Failed to update contact');
    }).catch(error =>
        console.log(error));

    redirectEditContactToContacts();
    load();
}

/**
 * this function creates the contact based on the input fields
 * @returns -the contact value
 */
function contactValue(i) {
    let email = document.getElementById('edit-input-email');
    let name = document.getElementById('edit-input-name');
    let phone = document.getElementById('edit-input-phone');
    let color_id = contacts[i]['color_id'];
    let first_letter = contacts[i]['first_letter'];
    let id = contacts[i]['id'];

    return contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'first_letter': first_letter,
        'color_id': color_id,
        'id': id,
    };
}

/**
 * this function sets the contact values into the input field of the edit overlay 
 * @param {index} index 
 */
function setContactValues(index) {
    document.getElementById('edit-input-name').value = `${contacts[index]['name']}`;
    document.getElementById('edit-input-email').value = `${contacts[index]['email']}`;
    document.getElementById('edit-input-phone').value = `${contacts[index]['phone']}`;
    document.getElementById('submit-edited-contact').setAttribute('onsubmit', `saveContactValues(${index}); return false`);
}
