window.addEventListener('load', function() {
      setTimeout(function() {
        var preloader = document.querySelector('.preloader');
        var body = document.querySelector('.body');
        preloader.remove(); // Remove the preloader element from the document
body.style.display = "block";
      }, 1500);

      setTimeout(function() {
        var loadingText = document.getElementById('loading-text');
        loadingText.textContent = 'LOADING finish';
      }, 1000);
const footer = document.querySelector('footer');
const paragraphs = footer.getElementsByTagName('p');
const lastParagraph = paragraphs[paragraphs.length - 1];
const currentYear = new Date().getFullYear();
lastParagraph.innerHTML = `&copy; Copyright 2023- ${currentYear} Blind Tech Agent. All Rights Reserved.`;
lastParagraph.style.fontSize = '18px';
    });