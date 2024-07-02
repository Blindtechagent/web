document.getElementById('google-sign-in').addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            announce("successfully sign in");
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.log(error.message);
            announce("error during google sign in, please try again later");
        });
});