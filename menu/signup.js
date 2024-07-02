const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');
const googleSignInButton = document.getElementById('google-sign-in');

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting normally

  const email = emailInput.value;
  const password = passwordInput.value;

  // Create user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Account created successfully
      const user = userCredential.user;
      const emailId = user.email; // Get the user's email ID

      const userName = document.getElementById("name").value;

      // Save the user's name to the database using the email ID as the key
      firebase.database().ref("users/" + emailId.replace('.', ',')).set({
        name: userName
      })
      .then(() => {
        announce('Account created successfully. Please log in with your new account.');
        window.location.href = 'login.html'; // Redirect to login.html
      })
      .catch((error) => {
        // Handle database save error
        console.error("Database save error:", error);
        announce("An error occurred while saving data. Please try again.");
      });
    })
    .catch((error) => {
      // Handle account creation error
      switch (error.code) {
        case 'auth/email-already-in-use':
          announce('An account already exists with this email. Please log in to your account.');
          window.location.href = 'login.html';
          break;
        case 'auth/invalid-email':
          announce('Invalid email format. Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          announce('The password is too weak. Please choose a stronger password.');
          break;
        default:
          console.error("Account creation error:", error);
          announce('An error occurred. Please try again.');
      }
    });
});

// Show/Hide Password
showPasswordCheckbox.addEventListener('change', function() {
  if (this.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

function announce(message) {
  const announcementBox = document.getElementById("announcement");
  announcementBox.innerText = message;
}
