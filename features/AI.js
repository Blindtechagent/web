function send() {
   var input_msg = document.getElementById('msg_text').value;
   var tb = document.getElementById('tb');
   if (input_msg != '') {
      var new_msg = document.createElement('div');
      new_msg.setAttribute('class', 'msg');
      var newId = generateUniqueId();
      new_msg.setAttribute('id', newId);
      tb.appendChild(new_msg);
      var msg_box = document.getElementById(newId);
      var msg_text = document.createElement('span');
      msg_text.innerText = input_msg;
      announce("message send successfully");
      msg_box.appendChild(msg_text);
      const user_msg = input_msg;
      document.getElementById('msg_text').value = '';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
            const responseData = JSON.parse(xhttp.responseText);
            const answerValue = responseData.answer;
            var ai_msg = document.createElement('div');
            ai_msg.setAttribute('class', 'msg1');
            var newId = generateUniqueId();
            ai_msg.setAttribute('id', newId);
            tb.appendChild(ai_msg);
            var ai_msg_box = document.getElementById(newId);
            var ai_msg_text = document.createElement('span');
            ai_msg_text.innerText = answerValue;
            ai_msg_box.appendChild(ai_msg_text);

            // Add copy button
            var copyButton = document.createElement('button');
            copyButton.innerText = 'Copy';
            copyButton.classList.add('btn', 'copy-btn');
            ai_msg_text.focus();
            announce("BTA AI replied");
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(answerValue);
                announce("message copied");
            });
            ai_msg_box.appendChild(copyButton);
         }
         tb.scrollTop = tb.scrollHeight;
      };
      xhttp.open("POST", "https://chatgpt.apinepdev.workers.dev/?question=" + user_msg, true);
      xhttp.send();
   }
}

document.getElementById('refreshButton').addEventListener('click', function() {
    var messages = document.querySelectorAll('.msg, .msg1');
    for (var i = 0; i < messages.length; i++) {
        messages[i].parentNode.removeChild(messages[i]);
        announce("chat refreshed successfully");
    }
    var tb = document.getElementById('tb');
    tb.scrollTop = 0;
});

function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}
