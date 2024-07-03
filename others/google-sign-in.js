const googleSignInButton = document.getElementById('google-sign-in');

  // Configure Google provider
  const provider = new firebase.auth.GoogleAuthProvider();

  // Set the scopes for the permissions you need
  provider.addScope('profile');
  provider.addScope('email');

  // Handle sign-in button click
  googleSignInButton.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token.
        const credential = result.credential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user); // You can handle the user object as needed

        // Redirect to index.html
        window.location.href = '../index.html';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = error.credential;
        console.error(error); // Handle error
      });
  });
