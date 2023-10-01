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


    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('loginNameInput').value;
        const email = document.getElementById('loginEmailInput').value;
        const password = document.getElementById('loginPassword').value;

        try {
            let response = await fetch(`${API_URL}/auction/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                let data = await response.json();
                localStorage.setItem('userToken', data.accessToken);
                localStorage.setItem('credits', data.credits);
                displaySuccessMessage("Logged in successfully!");
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error(errorData);
                displayErrorMessage('Error logging in. Please try again.');
            }
        } catch (error) {
            console.error('There was an error logging in', error);
            displayErrorMessage('Error logging in. Please try again.');
        }
    });


     document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (!/^[\w]{1,20}$/.test(name)) {
            displayErrorMessage('Invalid name. Name can only contain alphanumeric characters and underscores, and it must be less than 21 characters.');
            return;
        }

        if (!/^[a-zA-Z0-9_.]+@stud.noroff.no$/.test(email)) {
            displayErrorMessage('Please use your stud.noroff.no email address for registration.');
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
                    name: name,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                displaySuccessMessage('Successfully registered. You can now log in.');
            } else {
                const errorData = await response.json();
                console.error(errorData.errors[0].path);
                displayErrorMessage(errorData.errors[0].message);
            }
        } catch (error) {
            console.error('There was an error during registration', error);
            displayErrorMessage('Error during registration. Please try again.');
        }
    });
});
