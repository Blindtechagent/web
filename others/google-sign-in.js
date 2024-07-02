document.getElementById('google-sign-in').addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            announce('successfully sign in');
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.error(error);
            if (error.code === 'auth/network-request-failed') {
                announce('Network error, please check your internet connection and try again');
            } else if (error.code === 'auth/invalid-email') {
                announce('Invalid email, please enter a valid email address');
            } else {
                announce('Error during Google sign in, please try again later');
            }
        });
});