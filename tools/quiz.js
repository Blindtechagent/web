const apiUrlCategory1 = "https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=multiple";
const apiUrlCategory2 = "https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple";
const apiUrlCategory3 = "https://opentdb.com/api.php?amount=4&category=22&difficulty=easy&type=multiple";

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const correctAnswerText = document.getElementById("correct-answer-text");
const correctAnswerContainer = document.getElementById("correct-answer");
const nextButton = document.getElementById("next-button");
const scoreSummary = document.getElementById("score-summary");
const scoreElement = document.getElementById("score");
const correctCountElement = document.getElementById("correct-count");
const wrongCountElement = document.getElementById("wrong-count");
let currentQuestionIndex = 0;
let questions = [];
let correctCount = 0;
let wrongCount = 0;

function fetchQuestionsAndStartQuiz() {
    Promise.all([
        fetch(apiUrlCategory1).then((response) => response.json()),
        fetch(apiUrlCategory2).then((response) => response.json()),
        fetch(apiUrlCategory3).then((response) => response.json())
    ])
    .then(([category1Data, category2Data, category3Data]) => {
        questions = [...category1Data.results, ...category2Data.results, ...category3Data.results];
        displayQuestion(questions[currentQuestionIndex]);
    })
    .catch((error) => {
        console.error("Error fetching questions:", error);
    });
}

function displayQuestion(question) {
    questionContainer.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.incorrect_answers.forEach((incorrectAnswer) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = incorrectAnswer;
        optionButton.addEventListener("click", () => checkAnswer(incorrectAnswer === question.correct_answer, question.correct_answer));
        optionsContainer.appendChild(optionButton);
    });

    const correctOptionButton = document.createElement("button");
    correctOptionButton.textContent = question.correct_answer;
    correctOptionButton.addEventListener("click", () => checkAnswer(true, question.correct_answer));
    optionsContainer.appendChild(correctOptionButton);
}

function checkAnswer(isCorrect, correctAnswer) {
    if (isCorrect) {
        resultContainer.textContent = "Correct!";
        resultContainer.style.color = "#27ae60"; // Green for correct answers
        correctCount++;
    } else {
        resultContainer.textContent = "Wrong!";
        resultContainer.style.color = "#e74c3c"; // Red for wrong answers
        correctAnswerText.textContent = correctAnswer;
        correctAnswerContainer.style.display = "block";
        wrongCount++;
    }
    
    announceResult(isCorrect, correctAnswer);

    nextButton.style.display = "block";

    if (currentQuestionIndex === questions.length - 1) {
        showScoreSummary();
    }
}

function announceResult(isCorrect, correctAnswer) {
    const announceText = isCorrect ? "Correct!" : "Wrong!";
    const answerText = "Correct answer: " + correctAnswer;
    const combinedText = announceText + " " + answerText;

    resultContainer.textContent = combinedText;
    resultContainer.setAttribute("aria-hidden", "false");
    
    setTimeout(() => {
        resultContainer.setAttribute("aria-hidden", "true");
    }, 3000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
        resultContainer.textContent = "";
        correctAnswerText.textContent = "";
        correctAnswerContainer.style.display = "none";
        nextButton.style.display = "none";
    } else {
        showScoreSummary();
    }
}

function showScoreSummary() {
    questionContainer.textContent = "";
    optionsContainer.textContent = "";
    scoreSummary.style.display = "block";
    scoreElement.textContent = correctCount + " / " + questions.length;
    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
}

fetchQuestionsAndStartQuiz();
const startQuizButton = document.getElementById("start-quiz-button");
const introSection = document.getElementById("intro-section");
const quizContainer = document.querySelector(".quiz-container");

startQuizButton.addEventListener("click", () => {
    introSection.style.display = "none";
    quizContainer.style.display = "block";
    fetchQuestionsAndStartQuiz();
});
