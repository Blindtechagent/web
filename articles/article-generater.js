function announce(message) {
    // Announce the message for screen readers
    var liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('class', 'sr-only');
    liveRegion.innerText = message;
    document.body.appendChild(liveRegion);

    // Remove the element after the message is announced
    setTimeout(function () {
        document.body.removeChild(liveRegion);
    }, 1000);
}

function sendRequest() {
    var input_topic = document.getElementById('article-topic').value;
    var additional_details = document.getElementById('aditional').value;  // Fix ID

    if (input_topic !== '') {
        announce("Generating article, please wait...");

        // Clear input fields
        document.getElementById('article-topic').value = '';
        document.getElementById('aditional').value = '';  // Fix ID

        const articleContainer = document.getElementsByClassName("article-container")[0];
        articleContainer.innerHTML = '';
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const responseData = JSON.parse(xhttp.responseText);
                    const answerValue = responseData.response;

                    var generatedArticle = document.createElement('div');
                    generatedArticle.innerHTML = answerValue;
                    generatedArticle.setAttribute('class', 'GeneratedArticle');
                    articleContainer.appendChild(generatedArticle);

                    // Add copy button
                    var copyButton = document.createElement('button');
                    copyButton.innerText = 'Copy';
                    copyButton.classList.add('btn', 'copy-btn');

                    announce("Article generated successfully!");

                    copyButton.addEventListener('click', function () {
                        navigator.clipboard.writeText(answerValue);
                        announce("Message copied");
                    });

                    articleContainer.appendChild(copyButton);
                } else {
                    announce("An error occurred while generating the article.");
                }
                articleContainer.scrollTop = articleContainer.scrollHeight;
            }
        };

        const apiEndpoint = "https://darkness.ashlynn.workers.dev/chat/?model=gpt-4o-mini&prompt=";
        xhttp.open("GET", apiEndpoint +
            `write an article on ${input_topic}.
            include also ${additional_details} if provided.
            start with asking common question relative to the topic to make it engaging and attractive.
use a formal tone in the article.
            article must be in a humanly tone and human friendly language, not AI generated.
use simple words in the article that are easy to understand and human friendly.
in whole article maintain a flow that kept readers till the end of article and avoid using high quality words and typical synonyms and difficult words.
article must contain first heading: "Introduction" and last heading: "Conclusion".
use a standard format with heading, subheading and list.
each heading must contain at least 2-3 paragraphs, separated with paragraph tags.
in each heading each paragraph tag should contain only one to two lines.
every heading should be connected and whole article should be in one theme.
article should contain facts and filled with current knowledge.
return the article in html code, but not the whole boiler plate.
don't use heading level 1 in the article. instead you can use heading level 2 for headings and heading level 3 for subheadings.
after the article also generate a catchy title, meta description, meta keywords and a shareable text all in simple language and simple words.`,
            true
        );
        xhttp.send();
    } else {
        announce("Please enter a topic.");
    }
}
