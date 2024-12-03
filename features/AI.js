
// Add event listener to form submission for text-based input
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputMsg = document.getElementById('msg_text').value.trim();
    const tb = document.getElementById('tb');

    if (inputMsg !== '') {
        // User message section
        appendMessage('You said:', inputMsg, 'msg', 'sender-user', tb);

        // Announce message sent successfully (for screen readers)
        announce("Message sent successfully");

        document.getElementById('msg_text').value = '';  // Clear input field
        tb.scrollTop = tb.scrollHeight;  // Auto-scroll to the latest message

        // Display loading indicator while fetching AI response
        const loadingIndicator = appendMessage('BTA AI is typing...', '...', 'msg1', 'loading', tb);

        // Fetch AI response
        fetchAIResponse(inputMsg, tb, loadingIndicator);
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

// Function to fetch AI response from the server/API
function fetchAIResponse(userMsg, tb, loadingIndicator) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            // Remove loading indicator after response is received
            tb.removeChild(loadingIndicator);

            if (this.status === 200) {
                const responseData = JSON.parse(xhttp.responseText);
                const answerValue = responseData.response;

                // Append the AI's response to the chat
                const aiMsgContainer = appendMessage('BTA AI said:', answerValue, 'msg1', 'sender-ai', tb);

                // Auto-scroll the chat window to show the new message
                tb.scrollTop = tb.scrollHeight;

                // Announce AI response (for screen readers)
                announce("Blind Tech Agent AI replied");
            } else {
                // Error handling for failed AI response
                announce("Error retrieving AI response, please try again.");
            }
        }
    };

    // Sending GET request to the AI API with the user's message
    xhttp.open("GET", "https://darkness.ashlynn.workers.dev/chat/?model=gpt-4o-mini&prompt=" + encodeURIComponent(userMsg), true);
    xhttp.send();
}

// Event listener for refresh button
document.getElementById('refreshButton').addEventListener('click', function () {
    const tb = document.getElementById('tb');
    tb.innerHTML = `          <div class="dfm">
            <span>Hello! I am Blind Tech Agent AI. How can I assist you today?</span>
          </div>`;
    announce("Chat refreshed successfully");
    tb.scrollTop = 0;  // Scroll to the top after refresh
});

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
