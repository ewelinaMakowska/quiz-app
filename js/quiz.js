console.log("Hello from the game!");
const question = document.getElementById("question");
const questionText = document.getElementById("question-text");

const questionNumberHTML = document.getElementById("question-number");
const scoreHTML = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");

const image = document.getElementById("image");

console.log(question);

const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
       SRC: "/img/Kouros.jpg",
       question: "What is the name of this sculpture?",
       choice1: "Kouros",
        choice2: "Lady of Auxerre",
        choice3: "Kritios Boy",
        choice4: "Doryphoros",
       answer: 1
        
    },
    {
       SRC: "/img/Nike-of-Samothrace.jpg",
       question: "What is the name of this artwork?",
       choice1: "Venus of Milo",
        choice2: "Lady of Auxerre",
        choice3: "Kouros",
        choice4: "Nike of Samothrace",
       answer: 4
        
    },
    {
       SRC: "/img/Lady-of-Auxerre.jpg",
       question: "What is the name of this sculpture?",
       choice1: "Kouros",
        choice2: "Lady of Auxerre",
        choice3: "Kritios Boy",
        choice4: "Doryphoros",
       answer: 2      
    },
    {
      SRC: "",
       question: "What does the term 'chiaroscuro' mean?",
       choice1:  "Painting technique",
        choice2: "Lady of Auxerre",
        choice3: "Kritios Boy",
        choice4: "Doryphoros",
       answer: 1
    }
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/css/end.html');         
    }
    
    questionCounter++;
    questionNumberHTML.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionText.innerText = currentQuestion.question;
    if(currentQuestion.SRC) {
        image.src = currentQuestion.SRC;
    } else {
        image.src = "/img/quotation-mark.png";
    };
    
   
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]; //get an index of answer
        console.log(selectedAnswer);
        console.log(currentQuestion.answer);
        console.log(selectedAnswer==currentQuestion.answer);
        console.log(selectedChoice);
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        };
        
        selectedChoice.classList.add(classToApply);
           
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);       
    });
});

incrementScore = num => {
    score += num;
    scoreHTML.innerText = score;
};

startGame();