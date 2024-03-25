
const media = document.getElementById("myMedia");
const playPauseButton = document.getElementById("playPause");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");
const muteButton = document.getElementById("mute");
const fullscreenButton = document.getElementById("fullscreen");
const speedControl = document.getElementById("speed");
const currentTimeDisplay = document.getElementById("currentTime");
const progress = document.getElementById("progress");
const durationDisplay = document.getElementById("duration");
const mediaInput = document.getElementById('mediaInput');
const fileNameDisplay = document.getElementById('fileName');
const fileTypeDisplay = document.getElementById('fileType');
const fileSizeDisplay = document.getElementById('fileSize');
let isMuted = false;

// Add event listener for keyboard shortcuts
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey) {
        // Ctrl key is pressed
        if (event.key === ' ') {
            togglePlayPause();

            event.preventDefault();
        }
        switch (event.key) {
            case 'ArrowLeft':
                // Ctrl + Left Arrow: Rewind
                media.currentTime -= 10;
                break;
            case 'ArrowRight':
                // Ctrl + Right Arrow: Fast Forward
                media.currentTime += 10;
                break;
            case 'm':
                // Ctrl + M: Mute or Unmute
                isMuted = !isMuted;
                media.muted = isMuted;
                if (isMuted) {
                    muteButton.innerHTML = "&#128266;"; // Muted icon
                    muteButton.setAttribute('aria-label', 'Unmute');
                } else {
                    muteButton.innerHTML = "&#128263;"; // Unmuted icon
                    muteButton.setAttribute('aria-label', 'Mute');
                }
                break;
            case 's':
                // Ctrl + S: Change Playback Speed
                // You can customize this based on your needs
                // Example: increase playback speed
                const currentSpeed = parseFloat(speedControl.value);
                speedControl.value = (currentSpeed + 0.25).toString();
                media.playbackRate = currentSpeed + 0.25;
                break;
        }
    }
});

function loadMedia() {
    const file = mediaInput.files[0];

    if (file) {
        const objectURL = URL.createObjectURL(file);
        media.src = objectURL;
        media.load();
        playPauseButton.setAttribute('aria-label', 'Play');

        fileNameDisplay.textContent = `File Name: ${file.name}`;
        fileTypeDisplay.textContent = `File Type: ${file.type}`;

        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        fileSizeDisplay.textContent = `File Size: ${fileSizeMB} MB`;

        if (file.type.startsWith('video/')) {
            media.style.display = 'block';
            canvas.style.display = 'none';
            fullscreenButton.style.display = 'block';
        } else {
            media.style.display = 'none';
            canvas.style.display = 'block';
            fullscreenButton.style.display = 'none';
        }

        document.getElementById('mediaInfo').style.display = 'block';
    } else {
        document.getElementById('mediaInfo').style.display = 'none';
    }
}

function togglePlayPause() {
    if (media.paused) {
        media.play();
        playPauseButton.innerHTML = "&#9616;&#9616;"; // Pause icon
        playPauseButton.setAttribute('aria-label', 'Pause');
        startVisualization()
    } else {
        media.pause();
        playPauseButton.innerHTML = "&#9654;"; // Play icon
        playPauseButton.setAttribute('aria-label', 'Play');
    }
}

// Function to toggle full screen mode
function toggleFullScreen() {
    if (media.requestFullscreen) {
        media.requestFullscreen();
    } else if (media.mozRequestFullScreen) { // Firefox
        media.mozRequestFullScreen();
    } else if (media.webkitRequestFullscreen) { // Chrome, Safari and Opera
        media.webkitRequestFullscreen();
    } else if (media.msRequestFullscreen) { // IE/Edge
        media.msRequestFullscreen();
    }
}

// Event listener for the fullscreen button
fullscreenButton.addEventListener("click", toggleFullScreen);

// Toggle mute and update button icon
muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    media.muted = isMuted;
    if (isMuted) {
        muteButton.innerHTML = "&#128266;"; // Muted icon
        muteButton.setAttribute('aria-label', 'Unmute');
    } else {
        muteButton.innerHTML = "&#128263;"; // Unmuted icon
        muteButton.setAttribute('aria-label', 'Mute');
    }
});

// Rewind 10 seconds
rewindButton.addEventListener("click", () => {
    media.currentTime -= 10;
});

// Forward 10 seconds
forwardButton.addEventListener("click", () => {
    media.currentTime += 10;
});

// Change playback speed
speedControl.addEventListener("change", () => {
    const selectedSpeed = parseFloat(speedControl.value);
    if (!isNaN(selectedSpeed)) {
        media.playbackRate = selectedSpeed;
    } else {
        // Handle the case where speedControl.value is not a valid number.
    }
});

// Update current time and progress bar
progress.addEventListener("input", () => {
    const newTime = (progress.value / 100) * media.duration;
    media.currentTime = newTime;
});

media.addEventListener("timeupdate", () => {
    const currentTime = media.currentTime;
    const duration = media.duration;

    // Display current time in minutes and seconds
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeDisplay.textContent = `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;

    // Update progress bar
    progress.value = (currentTime / duration) * 100;
});

media.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(media.duration);
});

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const source = audioContext.createMediaElementSource(media);
source.connect(analyser);
source.connect(audioContext.destination);

const canvas = document.getElementById("audioVisualization");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const config = {
    barCount: 100,
    barWidth: 9,
    barSpacing: 10,
    colorSpeed: 50,
    lineWidth: 3, // Width of the horizontal line
};

function drawVisualization() {
    const dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidthWithSpacing = config.barWidth + config.barSpacing;
    const totalWidth = config.barCount * barWidthWithSpacing - config.barSpacing;
    const startX = (canvas.width - totalWidth) / 2;

    const middleY = canvas.height / 2;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = config.lineWidth; // Set the width of the horizontal line

    // Draw the horizontal line in the middle of the canvas
    ctx.beginPath();
    ctx.moveTo(0, middleY);
    ctx.lineTo(canvas.width, middleY);
    ctx.stroke();

    for (let i = 0; i < config.barCount; i++) {
        const value = dataArray[i % dataArray.length];
        const halfValue = value / 255;
        const barHeightTop = halfValue * middleY;
        const barHeightBottom = halfValue * middleY;
        const hue = (i * config.colorSpeed) % 360;

        // Set the color to white
        ctx.fillStyle = 'white';

        // Draw the top part of the bar
        ctx.fillRect(startX + i * barWidthWithSpacing, middleY - barHeightTop, config.barWidth, barHeightTop);

        // Draw the bottom part of the bar
        ctx.fillRect(startX + i * barWidthWithSpacing, middleY, config.barWidth, barHeightBottom);
    }

    requestAnimationFrame(drawVisualization);
}

function startVisualization() {
    audioContext.resume().then(() => {
        media.play().catch(error => {
            console.error("Media playback error: ", error);
        });
        drawVisualization();
    });
}