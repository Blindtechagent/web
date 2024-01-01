$(document).ready(function () {
  const accountBtn = document.getElementById("accountBtn");
  const loginBtn = document.getElementById("loginBtn");
  const menuBtn = $('.menuBtn');
  const menuItems = $('#menuItems');

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

    menuBtn.click(function () {
      const isHidden = menuItems.css("display") === "none";
      menuItems.toggle(500);
      menuBtn.attr("aria-expanded", !isHidden);
      menuBtn.attr("aria-label", isHidden ? "Close Navigation Menu" : "Open Navigation Menu");
    });
  }
});
