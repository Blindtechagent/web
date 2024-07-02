document.getElementById('google-sign-in').addEventListener('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      window.location.href = '../index.html';
    })
    .catch(function(error) {
      console.error(error.message);
    })
});