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
      // Redirect to index.html with full URL
      window.location.href = 'https://blindtechagent.github.io/web/';
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/popup-closed-by-user') {
        document.getElementById('announcement').textContent = 'The popup was closed before completing the sign-in. Please try again.';
      } else {
        document.getElementById('announcement').textContent = `Error: ${errorMessage}`;
      }

      console.error('Error signing in:', error);
    });
});
