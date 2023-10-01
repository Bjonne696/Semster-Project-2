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

async function updateCredits() {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        return;
    }

    // Adjust the URL if necessary
    const response = await fetch('https://api.noroff.dev/api/v1/auction/profiles/my_username', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + userToken
        }
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('credits').textContent = `${data.credits} Credits`;
    } else {
        console.error("Failed to fetch user data.");
    }
}

// Call the function to populate credits on DOM load
updateCredits();