// Google Sign-In
const googleSignInButton = document.getElementById('google-sign-in');
googleSignInButton.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const emailId = user.email;

      firebase.database().ref("users/" + emailId.replace('.', ',')).set({
        name: user.displayName
      })
      .then(() => {
        announce('Signed in with Google successfully.');
        window.location.href = '../index.html'; // Redirect to index.html
      })
      .catch((error) => {
        // Handle database save error
        console.error("Database save error:", error);
        announce("An error occurred while saving data. Please try again.");
      });
    })
    .catch((error) => {
      // Handle sign-in error
      console.error("Google sign-in error:", error);
      announce('An error occurred during Google sign-in. Please try again.');
    });
});
