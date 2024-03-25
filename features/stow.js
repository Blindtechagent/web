
        let intervalId, isRunning, minutes = 0, seconds = 0;

        function updateTimer() {
            document.getElementById("timer").innerHTML = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
        }

        function incrementTimer() {
            let audio = document.getElementById("beep");
            audio.play();
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            updateTimer();
        }

        function startStop() {
            if (!isRunning) {
                intervalId = setInterval(incrementTimer, 1000);
                                announce("time started");
                document.getElementById("startStop").innerHTML = "Stop";
                isRunning = true;
            } else {
                clearInterval(intervalId);
                announce("time stopped");
                                document.getElementById("startStop").innerHTML = "Start";
                isRunning = false;
            }
        }

        function resetTimer() {
            clearInterval(intervalId);
                        announce("time reset successfully");
            isRunning = false;
            minutes = 0;
            seconds = 0;
            updateTimer();
            document.getElementById("startStop").innerHTML = "Start";
        }

        document.getElementById("startStop").addEventListener("click", startStop);
        document.getElementById("reset").addEventListener("click", resetTimer);

        updateTimer();
    