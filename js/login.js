document.addEventListener('DOMContentLoaded', function() {
    
    const API_URL = 'https://api.noroff.dev/api/v1';

    function displaySuccessMessage(message) {
        const successDiv = document.getElementById('successMessage');
        successDiv.textContent = message;
        successDiv.classList.remove('d-none');
    }

    function displayErrorMessage(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.remove('d-none');
    }

    // LOGIN
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            let response = await fetch(`${API_URL}/auction/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (response.ok) {
                let data = await response.json();
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('credits', data.credits); // Store credits in localStorage
                displaySuccessMessage("Logged in successfully!"); // display success
                setTimeout(() => { 
                    window.location.href = 'dashboard.html'; 
                }, 2000); // redirect after 2 seconds
            } else {
                displayErrorMessage('Error logging in. Please try again.');
            }
        } catch (error) {
            console.error('There was an error logging in', error);
            displayErrorMessage('Error logging in. Please try again.');
        }
    });

    // REGISTER
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('registerEmail').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            displayErrorMessage('Passwords do not match!');
            return;
        }

        try {
            let response = await fetch(`${API_URL}/auction/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                displaySuccessMessage('Successfully registered. You can now log in.');
            } else {
                displayErrorMessage('Error during registration. Please try again.');
            }
        } catch (error) {
            console.error('There was an error during registration', error);
            displayErrorMessage('Error during registration. Please try again.');
        }
    });
});