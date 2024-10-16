document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    const articleRef = firebase.database().ref('articles/' + articleId);
    const commentsRef = firebase.database().ref('articles/' + articleId + '/comments');

    let article;

    // Load article details
    articleRef.once('value', (snapshot) => {
        article = snapshot.val();
        if (article) {
            // Set the page title and meta tags
            document.title = article.title;
            addMetaTag('description', article.metaDescription);
            addMetaTag('keywords', article.metaKeywords);
            addMetaTag('title', article.metaTitle);

            addOgMetaTag('og:description', article.metaDescription);
            addOgMetaTag('og:title', article.metaTitle);
            const url = window.location.href;
            addOgMetaTag('og:url', url);

            // Display article details
            document.getElementById('article-title').textContent = article.title;
            const articleContent = document.getElementById('article-content');
            articleContent.innerHTML = `
                <p><strong>Published on: ${article.publishDate}</strong></p>
                <p><strong>Written by: ${article.author}</strong></p>
                <p><strong>Category: ${article.category}</strong></p>
                <article>${article.content}</article>
                <span style="margin:16px; padding:8px; background:#C2B280; color:skyblue;"><strong>Views: ${article.viewCount}</strong></span>
                <span style="margin:16px; padding:8px; background:#C2B280; color:skyblue;"><strong>Shares: ${article.shareCount}</strong></span>
            `;

            // Set the like and dislike counts
            document.getElementById('like-count').textContent = article.likeCount || 0;
            document.getElementById('dislike-count').textContent = article.dislikeCount || 0;

            // Increment view count after the article is fully loaded
            incrementViewCount(articleId);

            // Load comments when the article loads
            loadComments();
        } else {
            // Handle case where article is not found
            document.getElementById('article-title').textContent = "Article Not Found";
            document.getElementById('article-content').innerHTML = "<p>The requested article could not be found.</p>";
        }
    });

    // Share functionality
    document.getElementById('share-btn').addEventListener('click', function () {
        if (article && navigator.share) {
            navigator.share({
                title: article.title,
                text: article.title,
                url: window.location.href
            }).then(() => {
                incrementShareCount(articleId);
                announce('Article shared successfully!');
            }).catch((error) => {
                announce('Error sharing article: ' + error);
            });
        } else {
            announce('Web Share API is not supported in your browser.');
        }
    });

    // Like and Dislike functionality
    document.getElementById('like-btn').addEventListener('click', function () {
        incrementLikeCount(articleId);
    });

    document.getElementById('dislike-btn').addEventListener('click', function () {
        incrementDislikeCount(articleId);
    });

    // Handle comment form submission
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const author = document.getElementById('comment-author').value;
        const text = document.getElementById('comment-text').value;

        submitComment(author, text);
        commentForm.reset(); // Clear the form after submission
    });

    // Submit a comment to Firebase
    function submitComment(author, text) {
        const newCommentRef = commentsRef.push();
        newCommentRef.set({
            author: author,
            text: text,
            timestamp: new Date().toISOString()
        }).then(() => {
            announce('Comment added successfully.');
        }).catch((error) => {
            console.error('Error adding comment:', error);
            announce('Failed to add comment.');
        });
    }

    // Load and display comments in real time using 'on' listener
    function loadComments() {
        commentsRef.on('value', (snapshot) => {
            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = ''; // Clear existing comments

            const comments = snapshot.val();
            if (comments) {
                Object.keys(comments).forEach((commentId) => {
                    const comment = comments[commentId];
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                        <p><strong>${comment.author}</strong> (${new Date(comment.timestamp).toLocaleString()}):</p>
                        <p>${comment.text}</p>
                        <hr />
                    `;
                    commentsList.appendChild(commentElement);
                });
            } else {
                commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            }
        }, (error) => {
            console.error("Error loading comments:", error);
        });
    }

    // Utility functions...

    function incrementViewCount(articleId) {
        const articleRef = firebase.database().ref('articles/' + articleId);
        articleRef.transaction((article) => {
            if (article) {
                article.viewCount = (article.viewCount || 0) + 1;
            }
            return article;
        }).catch((error) => {
            console.error("Error updating view count:", error);
        });
    }

    function incrementShareCount(articleId) {
        const articleRef = firebase.database().ref('articles/' + articleId);
        articleRef.transaction((article) => {
            if (article) {
                article.shareCount = (article.shareCount || 0) + 1;
            }
            return article;
        }).catch((error) => {
            console.error("Error updating share count:", error);
        });
    }

    function incrementLikeCount(articleId) {
        const articleRef = firebase.database().ref('articles/' + articleId);
        articleRef.transaction((article) => {
            if (article) {
                article.likeCount = (article.likeCount || 0) + 1;
            }
            return article;
        }).then(() => {
            document.getElementById('like-count').textContent = (article.likeCount || 0);
        }).catch((error) => {
            console.error("Error updating like count:", error);
        });
    }

    function incrementDislikeCount(articleId) {
        const articleRef = firebase.database().ref('articles/' + articleId);
        articleRef.transaction((article) => {
            if (article) {
                article.dislikeCount = (article.dislikeCount || 0) + 1;
            }
            return article;
        }).then(() => {
            document.getElementById('dislike-count').textContent = (article.dislikeCount || 0);
        }).catch((error) => {
            console.error("Error updating dislike count:", error);
        });
    }

    function addMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }

    function addOgMetaTag(property, content) {
        const meta = document.createElement('meta');
        meta.property = property;
        meta.content = content;
        document.head.appendChild(meta);
    }

    function announce(message) {
        const announcement = document.getElementById('announcement');
        announcement.textContent = message;
    }
});
