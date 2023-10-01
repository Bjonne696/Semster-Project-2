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

    // Transform the email into a valid name format
    const transformEmailToName = (email) => {
        return email.replace(/[@.]/g, '');
    };

    // LOGIN
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const email = document.getElementById('loginEmail').value; // Ensure this ID matches the login form's email input ID
        const username = transformEmailToName(email); // If the API expects a username, transform the email to a username format
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
                localStorage.setItem('credits', data.credits);
                displaySuccessMessage("Logged in successfully!");
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                const errorText = await response.text();
                console.error(errorText);
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
        const username = transformEmailToName(email);  // Use the transform function
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (!/^[a-zA-Z0-9_.]+@stud.noroff.no$/.test(email)) {
            displayErrorMessage('Please use your stud.noroff.no email address for registration.');
            return;
        }

        if (!/^[a-zA-Z0-9_]{1,20}$/.test(username)) {
            displayErrorMessage('Username can only use a-Z, 0-9, and _. Max 20 characters.');
            return;
        }

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
                const errorData = await response.json();
                console.error(errorData);
                displayErrorMessage('Error during registration. Please check your input.');
            }
        } catch (error) {
            console.error('There was an error during registration', error);
            displayErrorMessage('Error during registration. Please try again.');
        }
    });
});
