document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    const articleRef = firebase.database().ref('articles/' + articleId);

    let article; // Define article outside the articleRef.on('value') scope

    articleRef.once('value', (snapshot) => { // Use once to avoid continuous callback triggering
        article = snapshot.val(); // Assign article inside the callback
        if (article) {
            // Set page title
            document.title = article.title;
            
            // Add meta tags
            addMetaTag('description', article.metaDescription);
            addMetaTag('keywords', article.metaKeywords);
            addMetaTag('title', article.metaTitle);

            addOgMetaTag('og:description', article.metaDescription);
            addOgMetaTag('og:title', article.metaTitle);
            var url = window.location.href;
            addOgMetaTag('og:url', url);

            document.getElementById('article-title').textContent = article.title;
            const audiotext = document.getElementById('article-content');
            audiotext.innerHTML = `
                <p><strong>Published on: ${article.publishDate}</strong></p>
                <p><strong>Written by: ${article.author}</strong></p>
                <p><strong>Category: ${article.category}</strong></p>
                <article>${article.content}</article>
                <span style="margin:16px; padding:8px; background:#C2B280; color:skyblue;"><strong>Views: ${article.viewCount}</strong></span>
                <span style="margin:16px; padding:8px; background:#C2B280; color:skyblue"><strong>Shares: ${article.shareCount}</strong></span>
            `;

            // Increment view count after the article is fully loaded
            incrementViewCount(articleId);
        } else {
            document.getElementById('article-title').textContent = "Article Not Found";
            document.getElementById('article-content').innerHTML = "<p>The requested article could not be found.</p>";
        }
    });

    document.getElementById('share-btn').addEventListener('click', function () {
        if (article && navigator.share) {
            navigator.share({
                title: article.title,
                text: `${article.title}`,
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
});
