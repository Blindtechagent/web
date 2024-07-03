const articlesList = document.getElementById('articles');

const db = firebase.database().ref('articles');

db.orderByKey().on('value', (snapshot) => {
  articlesList.innerHTML = '';
  const articles = snapshot.val();
  const articleKeys = Object.keys(articles).reverse(); // Reverse the order of keys

  articleKeys.forEach((key) => {
    const article = articles[key];
    let viewCount = article.viewCount || 0; // Check if viewCount exists, otherwise set to 0
    displayArticle(key, article.title, article.author, article.publishDate, article.category, viewCount);
  });
});

function displayArticle(id, title, author, publishDate, category, viewCount) {
  const articleDiv = document.createElement('div');
  articleDiv.classList.add('article');
  articleDiv.innerHTML = `
    <h2>${title}</h2>
    <p><strong>Written by: ${author}</strong></p>
    <p><strong>Published on: ${publishDate}</strong></p>
    <p><strong>Category: ${category}</strong></p>
    <p><strong>Views: ${viewCount}</strong></p>
    <button class="read-full-article-btn" onclick="viewArticle('${id}')">Read Full Article</button>
  `;
  articlesList.appendChild(articleDiv);
}

function viewArticle(id) {
  const articleRef = db.child(id); // Reference the specific article in the database
  articleRef.transaction((article) => { // Use a transaction to ensure data consistency
    if (article) { // Check if article exists
      article.viewCount = (article.viewCount || 0) + 1; // Increment viewCount
    }
    return article;
  }).then(() => {
    // Redirect to full article page after updating view count
    window.location.href = `articles/article.html?id=${id}`;
  }).catch((error) => {
    console.error("Error updating view count:", error);
  });
}
