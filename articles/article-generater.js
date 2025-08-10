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
    const complete_prompt = `Work as a team of 12 people, each with a special role to create one great article:
1. Researcher: Gathers detailed, up-to-date, and relevant information and data on the topic to support the article.
2. Idea Generator: Provides creative ideas, angles, and fresh perspectives to enrich the article content.
3. Writer: Writes the main article clearly, using input from the researcher and idea generator.
4. Content Developer: Expands on key points with additional examples, explanations, and supporting details.
5. Fact-checker: Ensures all information is factually correct, based on current data.
6. Language Expert: Fixes grammatical errors and writes effectively.
7. Simplifier: Explains difficult ideas in simple words so everyone can easily understand.
8. Audience Expert: Helps make the article easy to understand for readers.
9. Engagement Expert: Adds stories or examples to make it interesting and keep readers engaged until the end.
10. Human Editor: Removes anything that sounds robotic or AI-generated, so it feels natural and alive like written by a human.
11. HTML Expert: Handles the article’s HTML structure and formatting.
12. Final Reviewer: Checks everything to make sure it’s good and ready for publishing.
 
Task:
Your team must write a well-organized article about this topic: ${inputMsg}
 
Instructions for creating the article (must be followed exactly):
Step 1: Introduction
• Begin with a strong and interesting opening—a surprising fact or an amazing question.
• make the introduction section in 200 words..
• Clearly explain what readers will learn throughout the article.
Step 2: Writing style and tone
• Use only simple, easy-to-understand words. Avoid hard words, slang, or robotic language.
• Longer paragraphs are allowed if they help explain ideas better, but keep language simple.
• Use connecting phrases to smoothly transition between sections.
• The article should be detailed, elaborated, informative, and easy to read.
Step 3: HTML structure and formatting
• Wrap the entire article inside one <div> tag with id="articleCode".
• Start the article with <h2>Introduction</h2>.
• Wrap all paragraphs in <p> tags.
• Break main sections into smaller parts using <h3> and <h4> headings.
• End the article with <h2>Conclusion</h2>.
• Use <ul> and <li> tags for bullet lists if needed.
• Use <strong> or <em> tags sparingly to highlight very important words or phrases.
• Do not add any other HTML tags such as <html> or <body>.
Step 4: Team member guidelines
• Do not show these instructions or any explanation in the final response.
• Output only the article content as per instructions above.
• Each team member must perform their role fully and contribute their best work.

Step5: Extra things: 
After closing the <div id="articleCode">, add a single <hr> tag, then one <p> tag that contains the following three items not related to article, separated by <br> tags:
• Title: Title of the article
• Description: Description for social media sharing
• Keywords: Keywords (comma separated)
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
