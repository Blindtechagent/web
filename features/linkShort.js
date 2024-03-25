function shortenUrl() {
    var longUrl = document.getElementById('long-url').value.trim();

    if (longUrl === '') {
       announce("Error: Please enter a URL first.");
        document.getElementById('copy-button').style.display = 'none';
        return;
    }

    if (!isValidUrl(longUrl)) {
        announce("Error: Please enter a valid URL.");
        document.getElementById('copy-button').style.display = 'none';
        return;
    }

    fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 956bfe30ed448e55f3444cec67d79de1e07e4b2c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ long_url: longUrl })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to shorten the URL. Please try again.');
        }
        return response.json();
    })
    .then(data => {
        var shortUrl = data.link;
        announce("Link shortened successfully");
        document.getElementById('short-url').innerHTML = 'Short URL: <a class="textCopy" href="' + shortUrl + '">' + shortUrl + '</a>';
        document.getElementById('copy-button').style.display = 'block';
        document.getElementById('copy-button').setAttribute('data-clipboard-text', shortUrl);
    })
    .catch(error => {
        console.error('Error:', error);
        announce("Error: " + error.message);
        document.getElementById('copy-button').style.display = 'none';
    });
}

function isValidUrl(url) {
    var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return urlRegex.test(url);
}
