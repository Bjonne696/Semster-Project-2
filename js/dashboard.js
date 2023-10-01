document.getElementById('newListingButton').addEventListener('click', function() {
    window.location.href = 'listings.html';
});


document.getElementById('uploadAvatarButton').addEventListener('click', function() {
    const file = document.getElementById('avatarUpload').files[0];
    
    // Upload this file to your server or cloud storage
    // and then update the user's avatar URL in the user's database or where it's stored.

    // After a successful upload:
    alert('Avatar updated successfully!');
});