function generate() {
  const num = document.form_main.phone.value.trim();
  const code = document.form_main.code.value;
  const message = document.getElementById("message").value.trim(); // New line to get the message

  if (num.length !== 10 || isNaN(num)) {
    announce("Please enter a valid 10 digit phone number");
    return;
  }

  const link = "https://wa.me/";
  let result = `${link}${code}${num}`;
  
  if (message) {
    result += `?text=${encodeURIComponent(message)}`; // Append message to the link
  }

  document.getElementById('result').innerText = result;
  announce("link generated successfully");
}

    function enableDisable(phone) {
      const btnSubmit = document.getElementById("gen");
      if (phone.value.trim() !== "") {
        btnSubmit.disabled = false;
      } else {
        btnSubmit.disabled = true;
      }
    };

    function openInWhatsApp() {
      const result = document.getElementById("result");
      if (!result.value) {
        announce("Please generate the link first.");
        return;
      }
      document.form_main.submit();
    }

    function share() {
      const result = document.getElementById("result").value;
      if (!result) {
        announce("Please generate the link first.");
        return;
      }
      if (navigator.share) {
        navigator.share({
          title: 'Share WhatsApp link',
          url: result
        })
          .then(() => console.log('Link shared successfully'))
          .catch((error) => console.log('Error sharing link:', error));
      } else {
        announce('Web Share API not supported on this browser.');
      }
    }
  