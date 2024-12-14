// Parse URL parameters to get the article ID
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Reference to the article and its comments in Firebase
const articleRef = firebase.database().ref('articles/' + articleId);
const commentsRef = firebase.database().ref('articles/' + articleId + '/comments');

let article; // Variable to hold article data

// Load article details
articleRef.once('value', (snapshot) => {
    article = snapshot.val();
    if (article) {
        // Set the page title and meta tags
        document.title = article.title;
        addMetaTag('description', article.metaDescription);
        addMetaTag('keywords', article.metaKeywords);
        addMetaTag('title', article.metaTitle);

        // Set Open Graph meta tags for social sharing
        const url = window.location.href;
        addOgMetaTag('og:description', article.metaDescription);
        addOgMetaTag('og:title', article.metaTitle);
        addOgMetaTag('og:url', url);

        // Display article details
        document.getElementById('article-title').textContent = article.title;
        const audiotext = document.getElementById('article-content');
        audiotext.innerHTML = `
            <p><strong>Published on: ${article.publishDate}</strong></p>
            <p><strong>Written by: ${article.author}</strong></p>
            <p><strong>Category: ${article.category}</strong></p>
            <article>${article.content}</article>
            <span style="margin:20px; padding:16px; background: darkblue; color:ghostwhite;">
                <strong>Views: ${article.viewCount}</strong>
            </span>
            <span style="margin:20px; padding:16px; background: darkblue; color:ghostwhite;">
                <strong>Shares: ${article.shareCount}</strong>
            </span>
            <span style="margin:20px; padding:16px; background: darkblue; color:ghostwhite;">
                <strong>Comments: <span id="comment-count">0</span></strong>
            </span>
        `;
        const audio = new Audio();
        const playbtn = document.getElementById('listen-btn');
        const apiURL2 = 'https://www.techassistantforblind.com/modules/gtts.php';
        const audiotiming = document.getElementById("audiotiming");
        let isPlaying = false;
        let pausedTime = 0;

        playbtn.addEventListener('click', function () {
            if (isPlaying) {
                audio.pause();
                pausedTime = audio.currentTime;
                isPlaying = false;
                playbtn.innerHTML = 'Listen Article';
            } else {
                playAudio();
            }
        });

        function playAudio() {
            if (article && audio.src) {
                audio.currentTime = pausedTime;
                audio.play();
                isPlaying = true;
                playbtn.innerHTML = 'Pause Audio';
                announce('audio resumed');
            } else if (article) {
                announce('Playing audio, please wait...');
                playbtn.innerHTML = 'Loading...';

                const strippedText = article.title + stripHTML(article.content);

                fetch(`${apiURL2}?text=${encodeURIComponent(strippedText)}&lang=en-in`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error: Something went wrong!');
                        }
                        return response.text();
                    })
                    .then((audioURL) => {
                        audio.src = audioURL;
                        audio.currentTime = pausedTime; // Resume from the last paused time
                        audio.play();
                        audio.addEventListener("loadedmetadata", () => {
                            playbtn.innerHTML = 'Pause Audio';
                            isPlaying = true;
                            audiotiming.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
                        });

                        audio.addEventListener('ended', () => {
                            isPlaying = false;
                            playbtn.innerHTML = 'Listen Article';
                            audiotiming.textContent = '';
                        });

                        audio.addEventListener('timeupdate', () => {
                            audiotiming.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
                        });

                        announce('playing audio');
                    })
                    .catch((err) => {
                        console.error(err);
                        announce(err.message);
                        playbtn.innerHTML = 'Listen Article';
                    });
            }
        }

        function stripHTML(html) {
            let div = document.createElement('div');
            div.innerHTML = html;
            return div.textContent || div.innerText || '';
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }


        // Set like and dislike counts
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

// Increment view count only if the article hasn't been viewed by the user before
function incrementViewCount(articleId) {
    const viewedKey = `viewed_${articleId}`;
    const hasViewed = localStorage.getItem(viewedKey);

    if (!hasViewed) {
        // Increment view count in Firebase if it's the user's first view
        articleRef.transaction((article) => {
            if (article) {
                article.viewCount = (article.viewCount || 0) + 1;
            }
            return article;
        }).then(() => {
            // Store a flag in localStorage to indicate the article has been viewed
            localStorage.setItem(viewedKey, 'true');
        }).catch((error) => {
            console.error("Error updating view count:", error);
        });
    } else {
        console.log("User has already viewed this article. View count will not be incremented.");
    }
}

// Share functionality
document.getElementById('share-btn').addEventListener('click', function () {
    if (article && navigator.share) {
        navigator.share({
            title: article.title,
            text: `${article.title},\n\n${article.metaDescription}`,
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

// Load and display comments in real time
function loadComments() {
    commentsRef.on('value', (snapshot) => {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = ''; // Clear existing comments

        const comments = snapshot.val();
        let commentCount = 0; // Initialize comment count
        if (comments) {
            Object.keys(comments).forEach((commentId) => {
                commentCount++; // Increment count for each comment
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
        // Update the comment count in the HTML
        document.getElementById('comment-count').textContent = commentCount;
    }, (error) => {
        console.error("Error loading comments:", error);
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
    const likeID = `liked_${articleId}`;
    const hasLiked = localStorage.getItem(likeID);

    if (!hasLiked) {
        articleRef.transaction((article) => {
            if (article) {
                article.likeCount = (article.likeCount || 0) + 1;
            }
            return article;
        }).then(() => {
            localStorage.setItem(likeID, 'true');
            announce('you liked this article!');
            document.getElementById('like-count').innerHTML = (article.likeCount || 0);
        }).catch((error) => {
            console.error("Error updating like count:", error);
        });
    }
    else {
        announce('you have already like this article!');
    }
}

function incrementDislikeCount(articleId) {
    const dislikeId = `disliked_${articleId}`;
    const hasDisliked = localStorage.getItem(dislikeId);

    if (!hasDisliked) {
        articleRef.transaction((article) => {
            if (article) {
                article.dislikeCount = (article.dislikeCount || 0) + 1;
            }
            return article;
        }).then(() => {
            localStorage.setItem(dislikeId, 'true');
            announce('you disliked this article!');
            document.getElementById('dislike-count').innerHTML = (article.dislikeCount || 0);
        }).catch((error) => {
            console.error("Error updating dislike count:", error);
        });
    }
    else {
        announce('you have already dislike this article');
    }
}


// Utility functions for setting meta tags
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

// Announce a message on the page
function announce(message) {
    const announcement = document.getElementById('announcement');
    announcement.textContent = message;
}

// Toggle comments visibility
function showHide() {
    const container = document.querySelector("#commentsContainer");
    const commentsBtn = document.getElementById('commentsBtn');
    if (container.style.display == "none") {
        container.style.display = "block";
        commentsBtn.innerText = "Hide Comments";
    } else {
        container.style.display = "none";
        commentsBtn.innerText = "Show Comments";
    }
}
showHide(); // Initial call to show or hide comments
