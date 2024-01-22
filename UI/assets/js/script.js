function login() {

    var username = document.getElementById('username').value;    // Get the values from the input fields
    var password = document.getElementById('password').value;


    if (!username.endsWith('@email.com')) {
        alert('Invalid username. Please enter a valid email address.');// Validate the username and password
        return;
    }

    if (!/^\d{8}$/.test(password)) {
        alert('Invalid password. Please enter 8 digits.');
        return;
    }


    window.location.href = 'welcome.html';// If validation passes, redirect to welcome.html
}