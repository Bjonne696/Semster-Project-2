document.addEventListener('DOMContentLoaded', function() {
    const userToken = localStorage.getItem('userToken');
    const userCredits = localStorage.getItem('credits');
    let userLoggedIn = userToken !== null;


    function displayUserData(credits) {
        const creditsElement = document.getElementById('credits');

        creditsElement.textContent = `${credits} Credits`;
        document.getElementById('userBanner').classList.remove('d-none');
    }

    if (userLoggedIn && userCredits) {
        displayUserData(userCredits);
    }

    document.getElementById('accountLink').addEventListener('click', function(e) {
        if (!userLoggedIn) {
            alert('Please login first.');
            e.preventDefault();
        }
    });

    document.getElementById('logoutButton').addEventListener('click', function() {

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


    const response = await fetch('https://api.noroff.dev/api/v1/auction/profiles/name', {
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


updateCredits();