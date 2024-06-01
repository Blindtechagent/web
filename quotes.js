document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "https://api.quotable.io/random";
    let quote = "";
    let author = "";

    async function getQuote() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            quote = data.content;
            author = data.author;
            document.getElementById('thought').textContent = quote;
            document.getElementById('author').textContent = `by: ${author}`;
        } catch (error) {
            console.error('Error fetching the quote:', error);
        }
    }

    getQuote(); // Call the function to fetch and display the quote

    document.getElementById("copyBtn").addEventListener("click", function() {
        const text = document.querySelector(".textCopy").innerText;
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        announce("Quotation copied successfully!");
    });

    document.getElementById("shareBtn").addEventListener("click", function() {
        if (navigator.share) {
            navigator.share({
                title: 'Quote of the Day',
                text: `${quote}

by: ${author}`
            }).then(() => {
                announce("Quotation shared successfully!");
            }).catch((error) => {
                console.error('Error sharing the quote:', error);
            });
        } else {
            announce("Web Share API is not supported in your browser.");
        }
    });

    document.getElementById("translateBtn").addEventListener("click", function() {
        translateToHindi();
    });
});

function translateToHindi() {
    const thought = document.getElementById('thought').innerHTML;
    const sentences = thought.split('.'); // Split the quote into sentences
    const translatePromises = sentences.map(sentence => {
        if (sentence.trim() === "") return Promise.resolve(""); // Skip empty sentences
        return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(sentence.trim())}`)
            .then(response => response.json())
            .then(data => data[0][0][0])
            .catch(err => console.log(err));
    });

    Promise.all(translatePromises)
        .then(translatedSentences => {
            const translatedThought = translatedSentences.join('. ');
            document.getElementById('thought').innerHTML = translatedThought;
            announce("Translated successfully");
        })
        .catch(err => console.log(err));
}

// Function to announce messages
function announce(message) {
    const announcement = document.getElementById("announcement");
    announcement.textContent = message;
    setTimeout(function () {
        announcement.style.display = "none";
    }, 3000);
    announcement.style.display = "block";
}
