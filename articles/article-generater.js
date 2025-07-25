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
    const complete_prompt = `You are a senior performance copywriter and expert content strategist. You understand human psychology, SEO, and how to write online content that helps people and makes them take action.
Write a full article about this topic: ${inputMsg}

Please follow all the steps below:
 
1. Introduction
• Start with something strong. This could be a surprising fact, a clear question, or a simple comparison.
• Make the topic sound important and useful.
 
2. Tone and Language
• Use a formal and clear tone.
• Keep the words very simple and easy to read.
• Do not use hard words or robotic sentences.
• You can use “we” or “us” when it helps explain something better.
• Do not use slang or overly casual words.
 
3. Structure and Formatting
• Use this format in the whole article:
 • Start with the heading: <h2>Introduction</h2>
 • End with the heading: <h2>Conclusion</h2>
 • Use <h3> for main sections
 • Use <h4> for sub-sections
 • Wrap all regular text in <p> tags
 • Use <ul> or <ol> for any lists
• Keep the content organized. Only write about one main topic.
 
4. Content Style and Quality
• Keep everything clear and useful.
• Use simple examples if the topic is hard.
• Use real facts, numbers, or studies when helpful.
• Think about what the reader needs. Are they learning, solving a problem, or looking to act?
• Don’t repeat things or add filler. Every paragraph should be useful.
• Always use plain and simple language.
 
5. SEO and Discoverability
• Add long-tail keywords in a natural way.
• Use related keywords too, but do not overuse them.
• Use <strong> and <em> only when something is very important.
• Do not make the article sound fake or full of keywords.
 
6. Authority and Trust
• Write like an expert.
• Use mock expert quotes or real examples to build trust.
• Keep the writing focused and helpful.
• Be clear and professional all the way through.
 
7. Final Review Checklist
Before finishing the article, make sure:
• The tone is formal and respectful
• Simple words are used everywhere
• Sentences are short and easy to follow
• Each part connects well to the next
• The ending clearly sums up the main points
• The whole article is helpful and easy to understand
 
8. Output Format
• Return only the clean HTML content. Do not include <html>, <body>, or extra code.
• After the article, the also provide following in separate lines, not in HTML:
 • Title: A clear and simple headline
 • Meta Description: One sentence (around 150 characters) that explains the article
 • Meta Keywords: A list of related keywords, separated by commas
 • Shareable Text: A short sentence that can be posted on social media.
`;
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
    msgText.textContent = text;

    msgContainer.appendChild(heading);
    msgContainer.appendChild(msgText);
    let lineBreak = document.createElement('br');;
    msgContainer.appendChild(lineBreak);
    // Add "Listen" and "copy" button for AI messages
    if (messageClass === 'msg1') {
        const listenButton = createListenButton(text);
        msgContainer.appendChild(listenButton);
        const copyButton = createCopyButton(text);
        msgContainer.appendChild(copyButton);
    }

    parentElement.appendChild(msgContainer);

    return msgContainer;  // Return the message container to remove loading indicator later
}

// Function to create the "Listen" button and add voice functionality
function createListenButton(text) {
    const listenButton = document.createElement('button');
    listenButton.className = 'btn listen-btn';
    listenButton.setAttribute('aria-label', 'Listen');
    // Adding the icon for Listen button
    const icon = document.createElement('i');
    icon.className = 'fas fa-volume-up';  // Font Awesome icon for volume up
    listenButton.appendChild(icon);
    listenButton.addEventListener('click', function () {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    });
    return listenButton;
}

// Function to create a 'Copy' button for AI message
function createCopyButton(text) {
    const copyButton = document.createElement('button');
    copyButton.className = 'btn copy-btn';
    copyButton.setAttribute('aria-label', 'Copy response');
    // Adding the icon for Copy button
    const icon = document.createElement('i');
    icon.className = 'fas fa-copy';  // Font Awesome icon for copy
    copyButton.appendChild(icon);

    // Adding click event to copy the AI message to the clipboard
    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(text)
            .then(() => announce("Message copied to clipboard"))  // Announce copy success
            .catch(() => announce("Failed to copy message"));  // Announce copy failure
    });

    return copyButton;  // Return the copy button to append to the message
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
