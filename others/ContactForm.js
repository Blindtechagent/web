
        function sendMsg() {
            console.log('success');
            // Getting form data
            var name = document.querySelector('#user-name').value;
            var email = document.querySelector('#user-email').value;
            var userMessage = document.querySelector('#user-message').value;

            // Get the selected message purpose (suggestion or report)
            var purposeSelect = document.getElementById('purpose-select');
            var selectedPurpose = purposeSelect.options[purposeSelect.selectedIndex].text;

            // Create a message that includes the purpose
            var sendMessage = 'New Message' + '%0A' + 'Name : ' + name + '%0A' + 'Email : ' + email + '%0A' + 'Message Purpose : ' + selectedPurpose + '%0A' + 'Message : ' + userMessage;

            // Replace the following values with your Telegram chat information
            var telegramChatId = '1677053343,"';
            var telegramBotToken = '6837155748:AAHGB1nCHMWcqhizFI7T_gf3DB423rtq7H8';

            var URL = 'https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramChatId + '&text=' + sendMessage;

            // Create a new XMLHttpRequest object
            var xhr = new XMLHttpRequest();

            // Configure the request
            xhr.open('GET', URL, true);

            // Set up a callback for when the request is completed
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Request was successful
                    var responseData = JSON.parse(xhr.responseText);
                    console.log(responseData);
                    alert('Message Sent Successfully');
                } else {
                    // Request failed with an error status
                    console.error('Request failed with status:', xhr.status);
                    alert('Something went wrong');
                }
            };

            // Set up a callback for handling network errors
            xhr.onerror = function () {
                console.error('Network error occurred');
            };

            // Send the request
            xhr.send();

            var btnSubmit = document.getElementById("submit");
            btnSubmit.innerText = "Message Sent Successfully";
            btnSubmit.disabled = true;
        }
    