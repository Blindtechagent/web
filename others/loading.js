window.addEventListener('load', function() {
      setTimeout(function() {
        var preloader = document.querySelector('.preloader');
        var body = document.querySelector('.body');
        preloader.remove(); // Remove the preloader element from the document
body.style.display = "block";
      }, 2500);

      setTimeout(function() {
        var loadingText = document.getElementById('loading-text');
        loadingText.textContent = 'LOADING finish';
        loadingText.focus(); // Set focus to the loading text
      }, 2000);
    });
  