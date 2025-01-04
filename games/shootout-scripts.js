const initial_screen = document.getElementById('initialScreen');
const score_board = document.getElementById('scoreboard');
const game_area = document.getElementById('game-area');
const startBtn = document.getElementById("start-btn");
const controls = document.getElementById("controls");
const enemyInfo = document.getElementById("enemy_info");
const enemy_container = document.getElementById('enemy_container');
const enemy = document.getElementById('enemy_figure');
const gameInstructions = document.getElementById("game-instructions");
const playerScoreDisplay = document.getElementById("player-score");
const enemyScoreDisplay = document.getElementById("enemy-score");

// Audio files for different events
const sounds = {
    backgroundMusic: new Audio('bgm.mp3'),
    userShoot: new Audio('https://www.myinstants.com/media/sounds/m4a1_single-kibblesbob-8540445.mp3'),
    enemyShoot: new Audio('https://www.myinstants.com/media/sounds/bulletimpact.mp3'),
    success: new Audio('https://www.myinstants.com/media/sounds/stationary-kill_gDwMUvN.mp3'),
    start: new Audio('https://www.myinstants.com/media/sounds/gun-load_abJphmJ.mp3'),
    // missShot: new Audio('https://www.myinstants.com/media/sounds/bulletimpact.mp3'),
    milestone: new Audio('https://www.myinstants.com/media/sounds/point-drop.mp3'),
    victory: new Audio('https://www.myinstants.com/media/sounds/magikarp-jump-coins.mp3'),
    defeat: new Audio('https://www.myinstants.com/media/sounds/tf_nemesis.mp3')
};

// Set background music to loop and play softly

sounds.backgroundMusic.volume = 0.2;
sounds.backgroundMusic.loop = true;

let playerScore = 0;
let enemyScore = 0;
let enemyDirection = "";
let gameInterval;
let gameSpeed = 3500;
let gameActive = false;

function startGame() {
    gameActive = 'true';
    playerScore = 0;
    enemyScore = 0;
    updateScores();
    initial_screen.style.display = 'none';
    game_area.style.display = 'block';
    score_board.style.display = 'flex';
    enemyInfo.textContent = "Get Ready!";

    sounds.backgroundMusic.play();
    sounds.start.play();  // Start game sound

    gameInterval = setInterval(spawnEnemy, gameSpeed);
}

function endGame() {
    gameActive = 'false';
    clearInterval(gameInterval);
    gameSpeed = 3500;
    game_area.style.display = 'none';
    initial_screen.style.display = 'block';
    sounds.backgroundMusic.pause();

    if (playerScore >= 10) {
        gameInstructions.innerHTML = `    <h2>Victory! You Won!</h2>
    <p>Congratulations on your victory! You defeated the enemy!</p>
    <p>Well done! Ready to claim another victory?</p>`;
        sounds.victory.play();
    } else {
        gameInstructions.innerHTML = `    <h2>Game Over!</h2>
    <p>Oops! Looks like the enemy got the best of you this time.</p>
    <p>Don’t give up! With every try, you’ll get better!</p>
    <p>Ready to jump back into the action? Let's do it!</p>`;
        sounds.defeat.play();
    }

    startBtn.innerHTML = "Play Again";
}

function updateBackground(hit) {
    enemy_container.classList.remove('hit', 'miss'); // Clear previous states
    enemy_container.classList.add(hit ? 'hit' : 'miss'); // Apply new state
    setTimeout(() => enemy_container.classList.remove(hit ? 'hit' : 'miss'), 300);
}


function spawnEnemy() {
    const directions = ["left", "center", "right"];
    enemyDirection = directions[Math.floor(Math.random() * directions.length)];
    enemyInfo.textContent = `Enemy approaching from: ${enemyDirection.toUpperCase()}!`;
    enemy.style.display = 'block';
    enemy.classList.add(enemyDirection);
    // Add fading in animation
    enemy.style.opacity = 0;
    setTimeout(() => enemy.style.opacity = 1, 0);

    const timeoutId = setTimeout(() => {
        if (enemyDirection) {
            enemyScore++;
            updateBackground(false);
            enemyInfo.textContent = "No shot fired! Enemy hits you.";
            enemyInfo.classList.remove("appear");
            enemy.style.display = 'none';
            enemy.classList.remove(enemyDirection);
            // Play enemy shoot sound
            sounds.enemyShoot.play();

            updateScores();
            checkGameEnd();
        }
    }, gameSpeed - 1500);

    document.querySelectorAll(".shoot-btn").forEach(button => {
        button.onclick = () => shootEnemy(button.dataset.direction, timeoutId);
    });
}

function shootEnemy(direction, timeoutId) {
    clearTimeout(timeoutId);

    // Play user shoot sound
    sounds.userShoot.play();

    if (direction === enemyDirection) {
        playerScore++;
        updateBackground(true);
        // Add shatter animation
        enemy.classList.add("shatter");

        setTimeout(() => resetEnemy(), 500); // Remove enemy after shatter effect
        // Play success sound after user shoot
        sounds.success.play();

        if (playerScore === 5 || playerScore === 8) {
            sounds.milestone.play();  // Milestone sound
        }

        if (playerScore === 5) {
            enemyInfo.textContent = "Solid attack! Enemy's health is now Half.";
            gameSpeed = 3000;
        } else if (playerScore === 8) {
            enemyInfo.textContent = "Great shot! Enemy health critical, Enemy is almost dead!";
            gameSpeed = 2500;
        } else {
            enemyInfo.textContent = "Nice shot! Enemy Injured!";
        }
    } else {
        enemyScore++;
        updateBackground(false);

        // Play enemy shoot sound after miss shot
        sounds.enemyShoot.play();

        if (enemyScore === 5 || enemyScore === 8) {
            sounds.milestone.play();  // Milestone sound
        }

        if (enemyScore === 5) {
            enemyInfo.textContent = "Bad shot! Warning, Half health remaining!";
        } else if (enemyScore === 8) {
            enemyInfo.textContent = "Bad shot! You are dying! Act fast.";
        } else {
            enemyInfo.textContent = "Bad shot! Enemy hits you!";
        }
        resetEnemy();
    }

    enemyInfo.classList.remove("appear");
    enemy.style.display = 'none';
    enemy.classList.remove(enemyDirection);
    enemyDirection = "";
    updateScores();
    checkGameEnd();
}

function resetEnemy() {
    enemy.style.display = 'none';
    enemy.classList.remove("left", "center", "right", "shatter");
    enemyDirection = "";
}

function updateScores() {
    playerScoreDisplay.textContent = playerScore;
    enemyScoreDisplay.textContent = enemyScore;
}

function checkGameEnd() {
    if (playerScore >= 10 || enemyScore >= 10) {
        endGame();
    }
}

startBtn.addEventListener("click", startGame);

// Keyboard shortcuts for shooting with arrows
document.addEventListener("keydown", (event) => {
    if (!gameActive || controls.hidden) return; // Only allow shooting when the game is active

    const keyMap = {
        "ArrowLeft": "left",
        "ArrowUp": "center",
        "ArrowRight": "right"
    };

    if (keyMap[event.key]) {
        event.preventDefault();
        shootEnemy(keyMap[event.key]);
    }
});
