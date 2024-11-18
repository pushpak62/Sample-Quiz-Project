
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Java", "Python", "HTML", "C++"],
        correct: "HTML"
    },
    {
        question: "What is the largest planet in our Solar System?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        correct: "Jupiter"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo"],
        correct: "Albert Einstein"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answered = false; 

const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const timerText = document.getElementById("time-left");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");
const retryBtn = document.getElementById("retry-btn");

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionText.textContent = currentQuiz.question;
    answerOptions.innerHTML = "";
    currentQuiz.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", selectAnswer);
        answerOptions.appendChild(li);
    });
    resetTimer();
    answered = false; 
}

function selectAnswer(e) {
    if (answered) return; 

    const selectedOption = e.target.textContent;
    const correctAnswer = quizData[currentQuestion].correct;

    // Add visual feedback
    if (selectedOption === correctAnswer) {
        e.target.classList.add("selected");
        score++;
    } else {
        e.target.classList.add("wrong");
    }

    Array.from(answerOptions.children).forEach(option => {
        option.style.pointerEvents = "none"; 
    });

    nextBtn.disabled = false; 
    answered = true;
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        nextBtn.disabled = true; 
    } else {
        showResult();
    }
});

function showResult() {
    resultBox.classList.remove("hidden");
    document.getElementById("quiz-box").classList.add("hidden");
    scoreText.textContent = `Your score: ${score} / ${quizData.length}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerText.textContent = timeLeft;
    startTimer();
}

retryBtn.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    resultBox.classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();
    nextBtn.disabled = true;
    resetTimer();
});


loadQuestion();
startTimer();
