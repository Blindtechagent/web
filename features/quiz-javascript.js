let apiURL;

const selectElement = document.getElementById('category');
selectElement.innerHTML = `<option selected value="0">Select a category</option>
            <option value="https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple">Animals</option>
            <option value="https://opentdb.com/api.php?amount=10&category=30&difficulty=easy&type=multiple">Gadgets</option>
            <option value="https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple">General Knowledge</option>
            <option value="https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple">Science and Nature</option>
            <option value="https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple">Computers</option>`;
selectElement.addEventListener('change', () => {
    apiURL = selectElement.value;
});

let currentQuestion = 0;
let score = 0;
let questions = [];

const sounds = {
    correct: new Audio('https://www.myinstants.com/media/sounds/correct-buzzer.mp3'),
    wrong: new Audio('https://www.myinstants.com/media/sounds/wrong_5.mp3'),
    background: new Audio('https://www.myinstants.com/media/sounds/leappad-camera-app-music.mp3')
};

// Set up the background music
sounds.background.loop = true; // Ensure it loops
sounds.background.volume = 0.2; // Lower the volume

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const announcement = document.getElementById('announcement');

function startQuiz() {
    if (selectElement.value == '0') {
        alert('please select any category first!');
        return;
    }
    else {
        sounds.background.play(); // Start the background music
        transitionScreen(startScreen, quizScreen);
        fetchQuestions();
    }
}

async function fetchQuestions() {
    const response = await fetch(apiURL);
    const data = await response.json();
    questions = data.results;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        const correctAnswer = question.correct_answer;
        const allAnswers = [...question.incorrect_answers, correctAnswer];

        document.getElementById('question').innerHTML = question.question;
        document.getElementById('question-number').innerText = `Question ${currentQuestion + 1}`;
        document.getElementById('options').innerHTML = '';

        shuffleArray(allAnswers).forEach(answer => {
            const option = document.createElement('button');
            option.innerHTML = answer;
            option.setAttribute('role', 'button');
            option.setAttribute('aria-label', `Option: ${answer}`);
            option.addEventListener('click', () => checkAnswer(answer, correctAnswer));
            document.getElementById('options').appendChild(option);
        });
    } else {
        showFinalScore();
    }
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        sounds.correct.play();
        announce('Correct answer!', () => {
            score++;
            nextQuestion();
        });
    } else {
        sounds.wrong.play();
        announce('Wrong answer!', () => {
            nextQuestion();
        });
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showFinalScore() {
    sounds.background.pause(); // Pause the background music
    sounds.background.currentTime = 0; // Reset music position
    transitionScreen(quizScreen, endScreen);
    document.getElementById('final-score').innerText = `Your final score is: ${score}`;
    document.getElementById('final-message').innerText = getFinalMessage(score);
}

function getFinalMessage(score) {
    if (score >= 8) return "Amazing! You're a quiz master!";
    if (score >= 5) return "Good job! Keep practicing!";
    return "Better luck next time!";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').innerText = `Score: 0`;
    sounds.background.play(); // Restart the background music
    transitionScreen(endScreen, quizScreen);
    fetchQuestions();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function announce(message, callback) {
    announcement.innerText = message;
    setTimeout(() => {
        announcement.innerText = '';
        callback();
    }, 2000);
}

function transitionScreen(fromScreen, toScreen) {
    fromScreen.classList.remove('active');
    setTimeout(() => {
        fromScreen.style.display = 'none';
        toScreen.style.display = 'block';
        setTimeout(() => toScreen.classList.add('active'), 50);
    }, 500);
}
