async function getQuote() {
    try {
      const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
      const data = await response.json();
      document.getElementById('thought').textContent = data.quoteText;
      document.getElementById('author').textContent = `by: ${data.quoteAuthor}`;
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    getQuote();
  });