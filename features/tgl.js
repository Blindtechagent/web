function generateLink() {
      let username = document.getElementById("username").value.trim();
      let link = `https://telegram.me/${username}`;

      if (username === "") {
        announce("Please enter a valid username.");
        return;
      }
announce("link generated successfully");
      document.getElementById("result").value = link;
      enableButton("copy-btn");
    }

    async function shareLink() {
      let link = document.getElementById("result").value.trim();

      if (link === "") {
        announce("Please generate a link before sharing.");
        return;
      }

      try {
        await navigator.share({
          title: "Telegram Link",          url: link,
        });
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    }

    function openLink() {
      let link = document.getElementById("result").value.trim();

      if (link === "") {
        announce("Please generate a link before opening.");
        return;
      }

      window.open(link, "_blank");
    }

    function enableButton(buttonId) {
      let button = document.getElementById(buttonId || "generate-btn");
      let username = document.getElementById("username").value.trim();

      button.disabled = username === "";
    }
  