const articlesList = document.getElementById('articles');

const db = firebase.database().ref('articles');

db.orderByKey().on('value', (snapshot) => {
    articlesList.innerHTML = '';
    const articles = snapshot.val();
    const articleKeys = Object.keys(articles).reverse(); // Reverse the order of keys
    articleKeys.forEach((key) => {
        const article = articles[key];
        displayArticle(key, article.title, article.author, article.publishDate, article.category);
    });
});

function displayArticle(id, title, author, publishDate, category) {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    articleDiv.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Written by:</strong> ${author}</p>
        <p><strong>Published on:</strong> ${publishDate}</p>
        <p><strong>Category:</strong> ${category}</p>
        <button class="read-full-article-btn" onclick="viewArticle('${id}')">Read Full Article</button>
    `;
    articlesList.appendChild(articleDiv);
}

function viewArticle(id) {
    window.location.href = `articles/article.html?id=${id}`; // Redirect to the full article page
}
