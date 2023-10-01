document.addEventListener('DOMContentLoaded', function() {
    // Checking if user is logged in
    let userLoggedIn = localStorage.getItem('userToken') !== null;

    // Displaying the user banner if logged in
    if (userLoggedIn) {
        document.getElementById('userBanner').classList.remove('d-none');
    }

    // Preventing access to the account if not logged in
    document.getElementById('accountLink').addEventListener('click', function(e) {
        if (!userLoggedIn) {
            alert('Please login first.');
            e.preventDefault();
        }
    });

    // Logout functionality
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Clearing user token from localStorage and any other session data
        localStorage.removeItem('userToken');
        userLoggedIn = false;
        document.getElementById('userBanner').classList.add('d-none');
        alert('Logged out successfully.');
    });
});
