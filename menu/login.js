const firebaseConfig = {
  apiKey: "AIzaSyDHMNnIoAwyqrNP7AEDkMX2jup8L8shiTk",
    authDomain: "blind-tech-agent-5c78e.firebaseapp.com",
    projectId: "blind-tech-agent-5c78e",
    storageBucket: "blind-tech-agent-5c78e.appspot.com",
    messagingSenderId: "524768280922",
    appId: "1:524768280922:web:8b6e7693d711a38ccab363",
    measurementId: "G-1T12NRRERE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Login Form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', loginUser);

function loginUser(event) {
  event.preventDefault();
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Show loading message
  announce("Logging in...");

  // Use Firebase Authentication API to sign in the user
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      announce("Logged in successfully");
      window.location.href = "https://blindtechagent.github.io/web/";
    })
    .catch(function(error) {
      // Handle login errors
      switch (error.code) {
        case 'auth/user-not-found':
          announce('No account found with this email. Please create an account first.');
          window.location.href = "./createAccount.html";
          break;
        case 'auth/wrong-password':
          announce('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          announce('Invalid email format. Please enter a valid email.');
          break;
        case 'auth/user-disabled':
          announce('This account has been disabled. Please contact support.');
          break;
        default:
          console.error("Login error:", error);
          announce("An unknown error occurred. Please try again.");
      }
    });
}

// Forgot Password
document.getElementById('forgot-password-link').addEventListener('click', function() {
  const email = document.getElementById("login-email").value;
  if (email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function() {
        announce('Password reset email sent.');
      })
      .catch(function(error) {
        console.error("Password reset error:", error);
        announce("Failed to send password reset email. Please try again.");
      });
  } else {
    announce("Please enter your email address first.");
  }
});

const showPasswordCheckbox = document.getElementById('show-password');
const passwordInput = document.getElementById('login-password');

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
