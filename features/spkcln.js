
            document.addEventListener("DOMContentLoaded", function () {
                const cleanButton = document.getElementById("clean-button");
                const cleaningAnimation = document.getElementById("cleaning-animation");
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const frequencySelect = document.getElementById("frequency");

                cleanButton.addEventListener("click", function () {
                    const selectedFrequency = frequencySelect.value; // Get the selected frequency

                    const oscillator = audioContext.createOscillator();
                    oscillator.type = "sine";

                    // Set the frequency based on the selected option
                    switch (selectedFrequency) {
                        case "bass":
                            oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
                            break;
                        case "middle":
                            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                            break;
                        case "treble":
                            oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
                            break;
                        default:
                            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                            break;
                    }

                    oscillator.connect(audioContext.destination);

                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 10);

                    // Display the cleaning animation
                    cleaningAnimation.style.display = "block";

                    // Disable the button during cleaning
                    cleanButton.textContent = "Cleaning in Progress...";
                    cleanButton.disabled = true;
                    announce("cleaning started");

                    // Reset the button and hide the animation after 10 seconds
                    setTimeout(function () {
                        cleanButton.textContent = "Start Cleaning";
                        cleanButton.disabled = false;
                        announce("cleaning successful");
                        cleaningAnimation.style.display = "none";
                    }, 10000);
                });
            });
        