// google-sign-in.js
document.getElementById('google-sign-in').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User signed in:', user);
      // Redirect to index.html one folder above
      window.location.href = '../index.html';
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error('Error signing in:', error);
      // Show an error message to the user
      document.getElementById('announcement').textContent = `Error: ${errorMessage}`;
    });
});
