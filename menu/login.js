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

  // Use Firebase Authentication API to sign in the user
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
        announce("log in successfully");
      window.history.back();
    })
    .catch(function(error) {
      // Handle login errors
      if (error.code === 'auth/user-not-found') {
        announce('There is no account with this email. Please create an account first.');
        window.location.href = "./createAccount.html";
      } else {
        console.error("Login error:", error);
        announce("An error occurred. Please try again.");
      }
    });
}