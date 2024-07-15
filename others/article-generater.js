function announce(message) {
    // Announce the message for screen readers
    var liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('class', 'sr-only');
    liveRegion.innerText = message;
    document.body.appendChild(liveRegion);

    // Remove the element after the message is announced
    setTimeout(function() {
        document.body.removeChild(liveRegion);
    }, 1000);
}

function sendRequest() {
    var input_topic = document.getElementById('article-topic').value;

    if (input_topic !== '') {
        announce("Generating article, please wait...");
        const provided_topic = input_topic;
        document.getElementById('article-topic').value = '';
        const articleContainer = document.getElementsByClassName("article-container")[0];
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const responseData = JSON.parse(xhttp.responseText);
                    const answerValue = responseData.answer;

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

        xhttp.open("POST", "https://chatgpt.apinepdev.workers.dev/?question=" + encodeURIComponent(`Generate an article on ${provided_topic}.
instructions:
(Use simple words and simple language so that the article can be understood easily.
use a formal tone in article.
Use the standard format of article with headings, sub-headings, and lists.
Make sure that article contains headings for introduction and conclusion always.
Don't make the article complex. This should be easily understandable to the readers.
Explain the content of the article well, it should be detailed and elaborated.
Don't use high-quality words or other words that make the article AI generated.
Use a humanly tone in the article, so it should not look AI generated. Instead, it should look like it was written entirely by a human.
Generate at least 400 words for the article; you can generate more words but 400 words is minimum.
Format this article in HTML tags which should be fairly organized under the article tag, but don't use tags that aren't needed.
Don't insert boilerplate of HTML5 also.
Don't use heading level 1 tag, use heading level 2 or other headings instead.
Break a paragraph of a heading into more than one paragraph tag so that each heading must have two to three paragraphs. It should not be the case that the content of each heading is placed in just one paragraph tag.
After the article, also provide a relative and catchy title, relative meta description, and keywords in separate lines, but not in HTML tags, in normal text.
Also, provide a text that can be shared with the article's link for promoting. This text should be short and attractive to attract users to read the article, but this text should also not look AI generated and don't use high-quality words in this also.
At the end, tell how many words are available in the article.
Analyze the above instructions carefully and then generate the article.
Using high-quality words or phrases is strictly prohibited.
To generate the article, you must follow the above instructions, it is very much necessary.`), true);

        xhttp.send();
    }
}
