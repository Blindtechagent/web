
    document.addEventListener('DOMContentLoaded', () => {
      const imageInput = document.getElementById('imageInput');
      const languageSelect = document.getElementById('languageSelect');
      const convertBtn = document.getElementById('convertBtn');
      const statusContainer = document.getElementById('statusContainer');
      const resultContainer = document.getElementById('resultContainer');
      const copyBtn = document.querySelector('.copyBtn');

      convertBtn.addEventListener('click', () => {
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(imageInput.files[0]);

          statusContainer.textContent = "Converting image to text...";
          statusContainer.classList.remove("success", "error");

          reader.onload = () => {
            const image = new Image();
            image.src = reader.result;

            image.onload = () => {
              const selectedLanguage = languageSelect.value;

              Tesseract.recognize(image, selectedLanguage, { langPath: 'https://tessdata.projectnaptha.com/4.0.0' })
                .then((result) => {
                  resultContainer.textContent = result.data.text;
                  statusContainer.textContent = "Conversion complete!";
                  statusContainer.classList.add("success");
                  copyBtn.style.display = "inline";
                })
                .catch((error) => {
                  console.error('Error:', error);
                  statusContainer.textContent = "An error occurred during conversion. Please try again.";
                  statusContainer.classList.add("error");
                  copyBtn.style.display = "none";
                });
            };
          };
        } else {
          resultContainer.textContent = "";
          statusContainer.textContent = "Please select an image file.";
          statusContainer.classList.add("error");
          copyBtn.style.display = "none";
        }
      });

    });
  