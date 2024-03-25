
      var content = document.getElementById('txtContent'),
        fileNameInput = document.getElementById('fileName'),
        buttonDownload = document.getElementById('btnDownload'),
        buttonGenerate = document.getElementById('btnGenerate'),
        downloadBox = document.getElementById('downloadBox');

      function downloadPDF() {
        var fileName = fileNameInput.value || 'my.pdf';
        var doc = new jsPDF();

        doc.setFontSize(14);

        var contentLines = doc.splitTextToSize(content.value, 170);
        doc.text(20, 20, contentLines);
        doc.save(fileName);
      }

      function generatePDF() {
        downloadBox.style.display = "block";
        buttonGenerate.disabled = true;
        announce("PDF generated successfully");
      }

      buttonGenerate.addEventListener('click', generatePDF);
      buttonDownload.addEventListener('click', downloadPDF);
    