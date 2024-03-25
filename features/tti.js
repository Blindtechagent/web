
    function convertToImage() {
      var text = document.getElementById('input-text').value;
      var fontStyle = document.getElementById('font-style-select').value;
      var textColor = document.getElementById('text-color-select').value;
      var bgColor = document.getElementById('background-color-select').value;
      var fontSize = document.getElementById('font-size-range').value;

      var lines = text.split('\n'); // Split text into lines

      var lineHeights = fontSize * 1.2; // Adjust line spacing as needed

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // Calculate canvas dimensions based on screen size
      var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      canvas.width = screenWidth;
      canvas.height = screenHeight;

      ctx.font = fontStyle + ' ' + fontSize + 'px Arial';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'top';

      // Render each line of text on the canvas
      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 10, i * lineHeights + 10);
      }

      var dataURL = canvas.toDataURL();

      var image = document.createElement('img');
      image.src = dataURL;
      image.alt = 'Preview';
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = 'cover';

      var outputDiv = document.getElementById('output-image');
      outputDiv.innerHTML = '';
      outputDiv.appendChild(image);
announce("text converted to image successfully");
      var downloadName = prompt("Enter a name for the image", "DownloadedFromBlindTechAgent");

      var downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.className = 'download';
      downloadLink.download = downloadName + '.png';
      downloadLink.innerHTML = 'Download Image';
      outputDiv.appendChild(downloadLink);
    }

    var convertBtn = document.getElementById('convert-btn');
    convertBtn.addEventListener('click', convertToImage);
  