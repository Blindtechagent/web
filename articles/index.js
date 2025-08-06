const articlesList = document.getElementById('articles');
const db = firebase.database().ref('articles');

let currentPage = 0; // Start on the first page
const articlesPerPage = 7; // Number of articles per page
let totalArticles = 0;
let sortedArticles = [];

// Load and sort articles initially
db.orderByKey().on('value', (snapshot) => {
  const articles = snapshot.val();
  sortedArticles = Object.entries(articles).sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));
  totalArticles = sortedArticles.length;
  document.getElementById('totalArticles').innerHTML = `Total articles: ${totalArticles}`;
  displayArticles();
});

// Function to display articles for the current page
function displayArticles() {
  articlesList.innerHTML = ''; // Clear the list
  const start = currentPage * articlesPerPage;
  const end = start + articlesPerPage;
  const paginatedArticles = sortedArticles.slice(start, end);

  if (paginatedArticles.length === 0) {
    articlesList.innerHTML = `
      <div class="no-articles">
        <h2>No articles found</h2>
        <p>Sorry, we couldn't find any articles matching your criteria. Please try a different search or check back later.</p>
      </div>
    `;
    return;
  }

  paginatedArticles.forEach(([key, article]) => {
    displayArticle(key, article.title, article.author, article.publishDate, article.category, article.viewCount || 0);
  });

  // Update button visibility
  document.getElementById('previousBtn').style.display = currentPage === 0 ? 'none' : 'inline';
  document.getElementById('nextBtn').style.display = end >= totalArticles ? 'none' : 'inline';
}

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

// Handle viewing full article
function viewArticle(id) {
  db.child(id).once('value', (snapshot) => {
    const article = snapshot.val();
    // Redirect or load the full article
    window.location.href = `articles/article.html?id=${id}`;
  });
}

// Next page
function nextPage() {
  if ((currentPage + 1) * articlesPerPage < totalArticles) {
    currentPage++;
    displayArticles();
  }
}

// Previous page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    displayArticles();
  }
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
        article.author.toLowerCase().includes(searchText) ||
        article.content?.toLowerCase().includes(searchText) // Check content safely
      )
      .sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));

    sortedArticles = filteredArticles; // Update the sortedArticles array with filtered results
    totalArticles = sortedArticles.length; // Update totalArticles count for pagination
    currentPage = 0; // Reset to first page
    displayArticles();
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

    const sortedFilteredArticles = filteredArticles.sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));

    sortedArticles = sortedFilteredArticles; // Update the sortedArticles array with filtered results
    totalArticles = sortedArticles.length; // Update totalArticles count for pagination
    currentPage = 0; // Reset to first page
    displayArticles();
  });
});

// Initial setup for pagination buttons
document.getElementById('pagination').innerHTML = `
  <button id="previousBtn" onclick="prevPage()" style="display: none;">Previous 7 days</button>
  <button id="nextBtn" onclick="nextPage()">Next 7 days</button>
`;

function sortArticles(sortOption) {
  switch (sortOption) {
    case 'popular':
      sortedArticles.sort(([, a], [, b]) => (b.viewCount || 0) - (a.viewCount || 0));
      break;
    case 'latest':
      sortedArticles.sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));
      break;
    case 'oldest':
      sortedArticles.sort(([, a], [, b]) => new Date(a.publishDate) - new Date(b.publishDate));
      break;
    default:
      // Default to sorting by latest
      sortedArticles.sort(([, a], [, b]) => new Date(b.publishDate) - new Date(a.publishDate));
      break;
  }
  currentPage = 0; // Reset to the first page
  displayArticles();
}

// Initial display
displayArticles();


// sort articles
document.getElementById('sort-by').addEventListener('change', function () {
  sortArticles(this.value);
});
