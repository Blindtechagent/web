document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    const articleRef = firebase.database().ref('articles/' + articleId);

    let article; // Define article outside the articleRef.on('value') scope

    articleRef.on('value', (snapshot) => {
        article = snapshot.val(); // Assign article inside the callback
        if (article) {
            document.getElementById('article-title').textContent = article.title;
            const audiotext = document.getElementById('article-content');
            audiotext.innerHTML = `
                <p><strong>Published on:</strong> ${article.publishDate}</p>
                <p><strong>Written by:</strong> ${article.author}</p>
                <p><strong>Category:</strong> ${article.category}</p>
                <p>${article.content}</p>
            `;
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

            const strippedText = stripHTML(article.content);

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

});
