
    function encodeText() {
      const inputText = document.getElementById("inputText").value;
      if (inputText.trim() === "") {
        announce("Please enter text to encode.");
        return;
      }
      const encodedText = btoa(inputText);
      document.getElementById("outputText").value = encodedText;
      announce("text encoded successfully");
      document.getElementById("result").style.display = "block";
    }

    function decodeText() {
      const inputText = document.getElementById("inputText").value;
      if (inputText.trim() === "") {
        announce("Please enter text to decode.");
        return;
      }
      try {
        const decodedText = atob(inputText);
        document.getElementById("outputText").value = decodedText;
        announce("text Decoded successfully");
        document.getElementById("result").style.display = "block";
      } catch (error) {
        announce("Invalid input.");
      }
    }
  