firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, show content for logged-in users
    showLoggedInContent();
  } else {
    // User is not signed in, show content for non-logged-in users
    showNonLoggedInContent();
  }
});

function showLoggedInContent() {
  // Show elements that are only visible to logged-in users
  document.getElementById('loggedin-section').style.display = 'block';
  document.getElementById('non-loggedin-section').style.display = 'none';
}

function showNonLoggedInContent() {
  const nonLoggedInSection = document.getElementById('non-loggedin-section');
  nonLoggedInSection.innerHTML = `
    <h2>Account Required</h2>
    <p>You must have an account to access this page.</p>
    <p>Please sign up or log in to access our exclusive content.</p>
    <p><a href="../menu/createAccount.html">Sign Up</a> | <a href="../menu/login.html">Log In</a></p>
  `;

  nonLoggedInSection.style.display = 'block';
  document.getElementById('loggedin-section').style.display = 'none';
}
