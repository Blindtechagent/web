
        const bitlyApiKey = '956bfe30ed448e55f3444cec67d79de1e07e4b2c';
        const tinyUrlApiKey = '2nLQGpsuegHP8l8J0Uq1TsVkCzP3un3T23uQ5YovVf5lvvGOucGmFOYRVj6L';

        function shortenUrl() {
            const longUrl = document.getElementById('long-url').value.trim();
            const service = document.getElementById('service').value;

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

            if (service === 'bitly') {
                shortenWithBitly(longUrl);
            } else if (service === 'tinyurl') {
                shortenWithTinyUrl(longUrl);
            }
        }

        function isValidUrl(url) {
            var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
            return urlRegex.test(url);
        }

        function shortenWithBitly(longUrl) {
            fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + bitlyApiKey,
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

        function shortenWithTinyUrl(longUrl) {
            const alias = "sswn" + Math.random().toString(36).substring(2, 12);

            fetch("https://api.tinyurl.com/create", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${tinyUrlApiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: longUrl,
                    alias: alias
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to shorten the URL. Please try again.');
                }
                return response.json();
            })
            .then(data => {
                var shortUrl = data.data.tiny_url;
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

        function copyToClipboard() {
            const shortUrl = document.getElementById('short-url').textContent;
            navigator.clipboard.writeText(shortUrl).then(() => {
                announce('Short URL copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
