document.addEventListener('DOMContentLoaded', function() {
    
    const API_URL = 'https://api.noroff.dev/api/v1'; // replace with your actual endpoint base URL, like "http://example.com/api/v1"

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
                // Assuming your API returns a token in the format { token: 'YOUR_USER_TOKEN' }
                localStorage.setItem('userToken', data.token);
                window.location.href = 'dashboard.html'; // Redirecting to dashboard
            } else {
                alert('Error logging in. Please try again.');
            }
        } catch (error) {
            console.error('There was an error logging in', error);
        }
    });

    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            let response = await fetch(`${API_URL}/auction/auth/register`, {
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
                alert('Successfully registered. You can now log in.');
            } else {
                alert('Error during registration. Please try again.');
            }
        } catch (error) {
            console.error('There was an error during registration', error);
        }
    });
});