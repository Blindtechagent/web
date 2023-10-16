
const chatElement = document.getElementById("chat");
createIframe();
  
function createIframe() {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatgpt.hunet.ai/chat-gpt/Test%20User";
  iframe.style.background = "lime";
  iframe.scroling = "0";
  iframe.onload = function() {
    this.contentWindow.postMessage({ message: "FOCUS_INPUTBOX" }, "*")
  }

  chatElement.appendChild(iframe);
}

function sendMessageToIframe(message) {
  const chatElement = document.getElementById("chat");
  const chatIframeElement = chatElement.getElementsByTagName("iframe")[0];
  chatIframeElement.contentWindow.postMessage({ message }, "*") // Message 타입을 확인해 주세요.
}