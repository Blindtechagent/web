
    window.addEventListener('DOMContentLoaded', () => {
      const backgroundMusic = new Audio('https://cdn.pixabay.com/audio/2022/03/13/audio_def1e03e13.mp3');
      backgroundMusic.volume = "0.1";
      backgroundMusic.play();
      backgroundMusic.loop = "true";
    });

    let computerScore = 0;
    let userScore = 0;
    let roundCount = 0;
    let gameStatus = 'ongoing';
    const computerCountElement = document.getElementById('computer-count');
    const userCountElement = document.getElementById('user-count');
    const resultElement = document.getElementById('result');
    const playAgainButton = document.getElementById('play-again');

    function playGame(userChoice) {
      if (gameStatus === 'ended') return;

      const choices = ['rock', 'paper', 'scissors'];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];

      roundCount++;

      let result;
      let soundEffect = '';

      if (userChoice === 'rock') {
        if (computerChoice === 'scissors') {
          result = "You win!";
          userScore++;
          soundEffect = new Audio('https://www.myinstants.com/media/sounds/metal04gr-converted.mp3');
        } else if (computerChoice === 'paper') {
          result = "Computer wins!";
          computerScore++;
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c2c9289cb7.mp3');
        } else {
          result = "It's a tie!";
          soundEffect = new Audio('https://www.myinstants.com/media/sounds/rock-eyebrow-raise-sound-effect.mp3');
        }
      } else if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
          result = "You win!";
          userScore++;
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c2c9289cb7.mp3');
        } else if (computerChoice === 'scissors') {
          result = "Computer wins!";
          computerScore++;
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_13aa4ffe94.mp3');
        } else {
          result = "It's a tie!";
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2023/03/28/audio_45bf0b7be5.mp3');
        }
      } else if (userChoice === 'scissors') {
        if (computerChoice === 'paper') {
          result = "You win!";
          userScore++;
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_13aa4ffe94.mp3');
        } else if (computerChoice === 'rock') {
          result = "Computer wins!";
          computerScore++;
          soundEffect = new Audio('https://www.myinstants.com/media/sounds/metal04gr-converted.mp3');
        } else {
          result = "It's a tie!";
          soundEffect = new Audio('https://cdn.pixabay.com/audio/2023/06/11/audio_5c28096d73.mp3');
        }
      }

      computerCountElement.textContent = computerScore;
      userCountElement.textContent = userScore;
      resultElement.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;

      if (soundEffect instanceof Audio) {
        soundEffect.play();
      }

      if (computerScore === 10 || userScore === 10) {
        endGame();
      } else {
        const statusUpdate = `Round ${roundCount}. You chose ${userChoice}. Computer chose ${computerChoice}. ${result}. Your score: ${userScore}. Computer score: ${computerScore}.`;
        announce(statusUpdate);
      }
    }


    function endGame() {
      gameStatus = 'ended';

      playAgainButton.style.display = 'block';
      playAgainButton.disabled = false;

      let gameResult;
      if (computerScore > userScore) {
        gameResult = "Computer wins the game!";
        var lose = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7acc1c1ca7.mp3'); lose.play();
      } else {
        gameResult = "You win the game!";
        var win = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3'); win.play();
      }

      const finalResult = resultElement.textContent + " " + gameResult;
      resultElement.textContent = finalResult;
      announce(finalResult);
    }

    function resetGame() {
      computerScore = 0;
      userScore = 0;
      roundCount = 0;
      gameStatus = 'ongoing';

      computerCountElement.textContent = computerScore;
      userCountElement.textContent = userScore;

      playAgainButton.style.display = 'none';
      playAgainButton.disabled = true;
      announce("Game reset. Select one of the following options.");
    }
  