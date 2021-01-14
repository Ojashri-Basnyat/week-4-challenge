const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// let questions = [ {
//     "question": "Inside which HTML element do we put the JavaScript?",
//     "choice1": "<script>",
//     "choice2": "<JavaScript>",
//     "choice3": "<js>",
//     "choice4": "<scripting>",
//     "answer": 1
// },
// {
//     "question": "What is the correct syntax for referring to an external script called xxx.js?",
//     "choice1": "<script href='xxx.js'>",
//     "choice2": "<script name='xxx.js'>",
//     "choice3": "<script src='xxx.js'>",
//     "choice4": "<script file='xxx.js'>",
//     "answer": 3
// },
// {
//     "question": "How do you write 'Hello World' in an alert box?",
//     "choice1": "msgBox('Hello World');",
//     "choice2": "alertBox('Hello World');",
//     "choice3": "msg('Hello World');",
//     "choice4": "alert('Hello World');",
//     "answer": 4
// },
// {
//     "question": "Arrays in JavaScript can be used to store?",
//     "choice1": "numbers & strings",
//     "choice2": "others arrays",
//     "choice3": "booleans",
//     "choice4": "all of the above",
//     "answer": 4
// }];



// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// using arrow syntax
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
}
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS * 100)}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

     const classToApply = 
     selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

     if(classToApply === 'correct') {
         incrementScore(CORRECT_BONUS);

     }

     else{
         countdown = countdown - 5; 
     }

     selectedChoice.parentElement.classList.add(classToApply);

     setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);  
    });
});

incrementScore = num => {
    score +=num; 
    scoreText.innerText = score;
}

var xhttp = new XMLHttpRequest();

xhttp.open("GET", "assets/js/quizquestions.json");
xhttp.send();
xhttp.onload = function() {
    if (xhttp.status == 200) {
       // Typical action to be performed when the document is ready:
       questions = JSON.parse(this.responseText); 
       
    }
    startGame();   
};

var countdown = 30;
var timer = setInterval(function () {
    console.log(countdown);
    countdown = countdown - 1;
   
    if (+countdown  >  1) {
        document.getElementById("timer").innerText =  countdown + ' Seconds'
            
    }

       
    else if (+countdown == 1) {
        document.getElementById("timer").innerText =  countdown + ' Second'

            
    }

    else if (+countdown == 0) {
        alert("Time Is Up!");
        //go to the end page
    return window.location.assign("./end.html");

            
    }
    else {
    clearInterval(timer);
    return;
    }


}, 1000);