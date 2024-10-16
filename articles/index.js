const articlesList = document.getElementById('articles');
const db = firebase.database().ref('articles');

// Load and display articles initially
db.orderByKey().on('value', (snapshot) => {
  const articles = snapshot.val();
  const sortedArticles = Object.entries(articles).sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));
  displayArticles(sortedArticles);
});

// Function to display articles or a friendly "No articles found" message
function displayArticles(articles) {
  articlesList.innerHTML = ''; // Clear the loading message
  if (articles.length === 0) {
    articlesList.innerHTML = `
      <div class="no-articles">
        <h2>No articles found</h2>
        <p>Sorry, we couldn't find any articles matching your criteria. Please try a different search or check back later.</p>
      </div>
    `;
    return;
  }
  articles.forEach(([key, article]) => {
    displayArticle(key, article.title, article.author, article.publishDate, article.category, article.viewCount || 0);
  });
}

// Search functionality
document.getElementById('searchform').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  const searchText = document.getElementById('searchBox').value.toLowerCase();
  db.orderByKey().once('value', (snapshot) => {
    const articles = snapshot.val();
    const filteredArticles = Object.entries(articles)
      .filter(([key, article]) =>
        article.title.toLowerCase().includes(searchText) ||
        article.category.toLowerCase().includes(searchText) ||
        article.content?.toLowerCase().includes(searchText) // Check content safely
      )
      .sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));

    displayArticles(filteredArticles);
  });
  document.getElementById('searchBox').value = ''; // Clear search input
});

// Filter by category
document.getElementById('filter-by').addEventListener('change', function () {
  const selectedCategory = this.value;
  db.orderByKey().once('value', (snapshot) => {
    const articles = snapshot.val();
    const filteredArticles = selectedCategory === 'all'
      ? Object.entries(articles)
      : Object.entries(articles).filter(([key, article]) => article.category === selectedCategory);

    const sortedArticles = filteredArticles.sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));
    displayArticles(sortedArticles);
  });
});

// Display each article
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

// Handle viewing full article (you can customize this)
function viewArticle(id) {
  db.child(id).once('value', (snapshot) => {
    const article = snapshot.val();
    // Increment the view count and save to the database
    const newViewCount = (article.viewCount || 0) + 1;
    db.child(id).update({ viewCount: newViewCount });

    // Redirect or load the full article (customize this part)
    window.location.href = `articles/article.html?id=${id}`;
  });
}
