// Function to fetch AI response from the server/API
async function fetchAIResponse(prompt, tb, loadingIndicator) {
    try {
        const response = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5IZkJDMlNyYUVUTjIyZVN3UWFNX3BFTU85SWpCM2NUMUk3T2dxejhLSzBhNWNMMXNzZlp3c09BSTR6YW1Sc1BmdGNTVk1GY0liT1RoWDZZX1lNZlZ0Z1dqd3c9PQ==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data = await response.json();

        tb.removeChild(loadingIndicator); // Remove loading indicator after response is received

        if (data.status === "success") {
            const answerValue = data.text;
            // Append the AI's response to the chat
            appendMessage('Article generated:', answerValue, 'msg1', 'sender-ai', tb);
            // Auto-scroll the chat window to show the new message
            tb.scrollTop = tb.scrollHeight;
            // Announce AI response (for screen readers)
            announce("article generated successfully!");
        } else {
            // Error handling for failed AI response
            announce("Error retrieving AI response, please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        tb.removeChild(loadingIndicator); // Ensure loading indicator is removed on error
        announce("There was an error fetching the response. Please check your internet connection and try again.");
    }
}

// Add event listener to form submission for text-based input
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputMsg = document.getElementById('msg_text').value.trim();
    const complete_prompt = `Your task is to write a well-organized article about this topic: ${inputMsg}
You must read, understand, and follow every instruction below carefully. Do not skip anything or do it only partially. You must follow all instructions exactly.
1. Introduction section
• Start the article with a strong and interesting opening. This could be a surprising fact, a clear question, or a simple comparison.
• Then clearly explain why the topic is important and how it helps the reader.
2. Tone and Language
• Write the article in a polite, formal, and clear way.
• Use only simple words that are easy to understand. Avoid hard words, slang, or robotic or casual language.
• You can write long paragraphs to explain things better if needed, as long as the words stay simple and the language stays easy to understand.
3. HTML Structure and Formatting
• Put the whole article inside one <div> tag with id="articleCode".
• Begin the article with <h2>Introduction</h2>.
• Wrap all regular paragraphs in <p> tags.
• After the introduction, include 4 to 5 main sections at least, each with a heading using <h3>. You can have more if the topic needs it, but not fewer than 4.
• If needed, break the main sections into smaller parts using <h4> headings, but this should not reduce the number of <h3> main sections.
• End the article with <h2>Conclusion</h2>.
• Use <ul> and <li> tags for bullet point lists.
• Use <ol> and <li> tags for numbered lists.
• Use <strong> or <em> tags only to show very important words or phrases, and use them sparingly.
• Do not add any other HTML tags like <html>, <body>, or extra code outside the <div id="articleCode">...</div>.
4. Content Style and Quality
• Explain ideas clearly and in a useful way.
• Use simple examples to help explain difficult ideas.
• Include real facts, numbers, or studies when they help make things clearer.
• Do not repeat ideas or add extra words that don’t help. Every paragraph should give new information.
• Write in plain and easy words that everyone can understand.
• Remember, you can write longer paragraphs to explain things better if you need to, as long as the language stays simple and easy.
5. SEO and Keywords
• Naturally include one or more long-tail keywords related to the topic in the article.
• You can also add related keywords but do not use them too much.
• Avoid putting in too many keywords or making the sentences sound unnatural.
6. Final Checklist Before Finishing
• Make sure the tone stays polite, formal, and clear all through the article.
• Use simple words everywhere in the article.
• Make sure the sections connect well and flow smoothly.
• The conclusion should clearly wrap up the main points.
• The whole article should be detailed,  elaborated, useful, easy to read, and meet all the instructions above.
7. Output Format and Extra Information
• Write only the article content inside the <div id="articleCode">...</div>. Do not add any other HTML or code outside this.
• Right after the closing </div>, add one <hr> tag.
• Below the <hr>, write these four items on separate lines using <br> tags (surrounded by <p></p>):
• Title: a clear and simple headline for the article
• Meta Description: one short sentence about 150 characters that summarizes the article
• Meta Keywords: related keywords separated by commas
• Shareable Text: a short sentence that can be shared on social media
Remember: You must follow every instruction fully and exactly. Use only the HTML tags and format shown here. Do not skip or only partly do any step.`;
    const tb = document.getElementById('tb');

    if (inputMsg !== '') {
        // User message section
        appendMessage('You said:', inputMsg, 'msg', 'sender-user', tb);

        // Announce message sent successfully (for screen readers)
        announce("request for article generation submitted successfully!");

        document.getElementById('msg_text').value = '';  // Clear input field
        tb.scrollTop = tb.scrollHeight;  // Auto-scroll to the latest message

        // Display loading indicator while fetching AI response
        const loadingIndicator = appendMessage('article is being generated...', '...', 'msg1', 'loading', tb);

        // Fetch AI response
        fetchAIResponse(complete_prompt, tb, loadingIndicator);
    }
});

// Function to append message to the chat
function appendMessage(sender, text, messageClass, senderClass, parentElement) {
    const msgContainer = document.createElement('div');
    msgContainer.className = messageClass;

    const heading = document.createElement('h5');
    heading.textContent = sender;
    heading.className = senderClass;

    const msgText = document.createElement('span');
    msgText.innerHTML = text;

    msgContainer.appendChild(heading);
    msgContainer.appendChild(msgText);
    let lineBreak = document.createElement('br');;
    msgContainer.appendChild(lineBreak);
    // Add code copy button
    if (messageClass === 'msg1') {
        const codeCopyBtn = document.createElement('div');
        codeCopyBtn.innerHTML = `<button class='btn' onclick="navigator.clipboard.writeText(document.getElementById('articleCode').innerHTML)">copy article code</button>`
        msgContainer.appendChild(codeCopyBtn);
    }

    parentElement.appendChild(msgContainer);

    return msgContainer;  // Return the message container to remove loading indicator later
}


// Function to announce messages to screen readers
function announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');  // Set role to 'alert' for live region
    announcement.className = 'visually-hidden';  // Make it visually hidden
    announcement.textContent = message;
    document.body.appendChild(announcement);

    // Remove the announcement after 1 second to avoid clutter
    setTimeout(() => document.body.removeChild(announcement), 1000);
}

// Add event listener for the microphone button to use voice recognition for input
document.getElementById('micBtn').addEventListener('click', function () {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('msg_text').value = transcript;
        };

        recognition.onerror = function () {
            announce("Sorry, I couldn't hear you. Please try again.");
        };
    } else {
        announce("Speech recognition is not supported in this browser.");
    }
});
