var content = document.getElementById('txtContent'),
    fileNameInput = document.getElementById('fileName'),
    buttonDownload = document.getElementById('btnDownload'),
    buttonGenerate = document.getElementById('btnGenerate'),
    downloadBox = document.getElementById('downloadBox'),
    form = document.getElementById('form'),
    pdfSizeElement = document.getElementById('pdf-size');

let pdfDocGenerator = null;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    announce("Generating PDF");
    setTimeout(() => {
        generatePDF();
    }, 1000);
});

function generatePDF() {
    const docDefinition = {
        content: [
            { text: content.value }
        ]
    };

    pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
        const size = (blob.size / 1024).toFixed(2);
        const sizeText = size >= 1000 ? (size / 1000).toFixed(2) + ' MB' : size + ' KB';
        pdfSizeElement.textContent = 'Size: ' + sizeText;
        announce('PDF Generated successfully. Please enter a file name and click on Download PDF button.');
        downloadBox.style.display = "block";
        form.style.display = "none";
        content.value = '';
        fileNameInput.placeholder = 'enter the file name here';
    });
}

function downloadPDF() {
    const pdfName = fileNameInput.value;
    if (pdfName) {
        announce('Downloading PDF...');
        setTimeout(() => {
            pdfDocGenerator.download(pdfName + '.pdf', () => {
                announce('Download Completed!');
                downloadBox.style.display = "none";
                form.style.display = "block";
                content.value = '';
            });
        }, 1500);
    } else {
        announce('Please enter a file name.');
    }
}

buttonDownload.addEventListener('click', downloadPDF);
