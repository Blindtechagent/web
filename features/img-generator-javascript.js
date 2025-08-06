function sendPrompt() {
    var input = document.getElementById('imgPrompt');
    var prompt = input.value.trim();
    if (prompt) {
        generateImage(prompt);
        input.value = '';
    }
}

function generateImage(query) {
    const announcement = document.getElementById('announcement');
    const generateBtn = document.getElementById('generateBtn');
    announcement.innerText = "Generating image, please wait...";
    generateBtn.disabled = true;

    var encodedQuery = encodeURIComponent(query);
    var apiUrl = `https://pollinations.ai/p/${encodedQuery}`;
    displayImage(apiUrl, query);
}

function displayImage(apiUrl, query) {
    var imgBox = document.getElementById('imgBox');
    var img = new Image();
    img.onload = function() {
        imgBox.innerHTML = ''; // Clear previous image/loading message
        imgBox.appendChild(img);
        img.alt = query;
        img.style.display = "block";
        img.style.margin = "auto";
        img.style.width = "100%";
        img.style.height = "40vh";
        document.getElementById('imgBox').style.display = "block";
        const announcement = document.getElementById('announcement');
        announcement.innerText = "Image generated successfully!";
        img.focus(); // Set focus to the new image
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.disabled = false;
    };
    img.onerror = function() {
        const announcement = document.getElementById('announcement');
        announcement.innerText = "Failed to load the generated image. The API may be busy. Please try again.";
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.disabled = false;
    };
    img.src = apiUrl;
    imgBox.innerHTML = 'Loading image...'; // Show loading message
}

function downloadImage(url, query) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = query.replace(/\s+/g, '_') + '.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}
