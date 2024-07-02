
function sendMsg(event) {
    event.preventDefault();
    console.log('success');
    
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var userMessage = document.querySelector('#message').value;
    var role = document.querySelector('#role');
    var selectedRoles = Array.from(role.selectedOptions).map(option => option.text).join(', ');

    var sendMessage = 'New Message' + '%0A' + 'Name: ' + name + '%0A' + 'Email: ' + email + '%0A' + 'role: ' + selectedRoles + '%0A' + 'other details: ' + userMessage;

    var telegramChatId = '1677053343';
    var BotToken = 'NjgzNzE1NTc0ODpBQUVRSEJYZGdYR1paODgwLUt5NHo4VFUxU1M1TlR2WF8zTQ==';
    var telegramBotToken = atob(BotToken);

    var URL = 'https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramChatId + '&text=' + sendMessage;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
            alert('form submitted Successfully');
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("joinForm").reset();
        } else {
            console.error('Request failed with status:', xhr.status);
            alert('Something went wrong');
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred');
    };
    xhr.send();
}
