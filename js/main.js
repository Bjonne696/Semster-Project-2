document.addEventListener('DOMContentLoaded', function() {
    const userToken = localStorage.getItem('userToken');
    const userCredits = localStorage.getItem('credits');
    let userLoggedIn = userToken !== null;

    // Function to display user data in userBanner
    function displayUserData(credits) {
        const creditsElement = document.getElementById('credits');

        creditsElement.textContent = `${credits} Credits`;
        document.getElementById('userBanner').classList.remove('d-none');
    }

    // If user data exists, display the data in the userBanner
    if (userLoggedIn && userCredits) {
        displayUserData(userCredits);
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
        // Clearing user token and credits from localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('credits');
        userLoggedIn = false;
        document.getElementById('userBanner').classList.add('d-none');
        alert('Logged out successfully.');
    });
});