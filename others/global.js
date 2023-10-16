$(document).ready(function () {
  const accountBtn = document.getElementById("accountBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (accountBtn && loginBtn) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        accountBtn.innerHTML = "Manage Account";
        accountBtn.href = "../menu/manageAccount.html";
        loginBtn.style.display = 'none';
      } else {
        accountBtn.innerHTML = "Create Account";
        accountBtn.href = "../menu/createAccount.html";
        loginBtn.style.display = 'block';
        loginBtn.href = "../menu/login.html";
      }
    });
  }

  $('.menuBtn').click(function () {
    $('.drawer').toggle(500);
  });
});
