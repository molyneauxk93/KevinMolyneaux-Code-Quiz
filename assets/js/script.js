var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var questionsEl = document.querySelector("#question");
var quizContainer = document.querySelector(".quiz-questions");
var submitContainer = document.querySelector(".submit-score");
var quizResult = document.querySelector(".quiz-result");
var scoreMsg = document.querySelector("#score-msg");
var submitButton = document.querySelector("#user-score-submit");
var scoreButton = document.querySelector("#highscore-button");
var optionA = document.querySelector("#A");
var optionB = document.querySelector("#B");
var optionC = document.querySelector("#C");
var optionD = document.querySelector("#D");

//initializing variables for count, timer functionality, and quiz score 
var count = 0;
var timer;
var timerCount;
var quizScore = 0;

// Multiple choice questions array with objects
var multiQuestions = [
    {
        question: 'What is 1 + 1?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 'A',
    },
    {
        question: 'What is 5 + 1?',
        choice1: '2',
        choice2: '3',
        choice3: '6',
        choice4: '5',
        answer: 'C',
    },
    {
        question: 'What is 12 + 1?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '13',
        answer: 'D',
    }
]



//startGame function called on button click event 
function startGame() {
    //initializing timer to 60
    timerCount = 60;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    //Function calls to render Quiz questions and starts the timer counter 
    renderQuiz();
    startTimer();
}

//Variables to render questions to screen
// var lastQuestion = multiQuestions.length - 1;
var currentQuestion = 0;

//Function to render questions to the screen
function renderQuiz() {
    if (currentQuestion < multiQuestions.length) {

        var loadQuestion = multiQuestions[currentQuestion];

        questionsEl.textContent = loadQuestion.question;
        optionA.textContent = "A." + loadQuestion.choice1;
        optionB.textContent = "B." + loadQuestion.choice2;
        optionC.textContent = "C." + loadQuestion.choice3;
        optionD.textContent = "D." + loadQuestion.choice4;
    }

}

//Starts Quiz timer countdown at 60 seconds
function startTimer() {
    //Display Quiz questions
    quizContainer.setAttribute("style", "display:block");
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        // Tests if time has run out
        if (timerCount === 0 || currentQuestion === multiQuestions.length) {
            // Clears interval
            clearInterval(timer);
            timesUp();
        }
    }, 1000);
}

//Function called if time runs our or there are no more questions 
function timesUp() {
    quizResult.textContent = "QUIZ HAS ENDED";
    scoreMsg.textContent = "You final score is " + quizScore + ". Please enter your Initials! Thanks for playing!";
    //Hides Questions and displays Score submission
    quizContainer.setAttribute("style", "display:none");
    submitContainer.setAttribute("style", "display:inline");
}


//Event listener to start button that called startGame function when clicked
startButton.addEventListener("click", startGame);

//Event listener for selected answers 

quizContainer.addEventListener("click", function (event) {
    event.preventDefault;
    var element = event.target;

    if (element.matches("div")) {
        var selectedOption = element.getAttribute("id");
        //Checks to see if the selected answer matches the correct answer for that question
        if (selectedOption === multiQuestions[currentQuestion].answer) {
            // Updates user score and increments current question variable number to update to the next question
            quizScore += 10;
            currentQuestion++;
            // calls render quiz function again to refresh to new question
            renderQuiz();
        } else {
            // If user choice was incorrect, timer decreases by 10 seconds
            timerCount = timerCount - 10;
            //Increments current question variable number and calls function to update question
            currentQuestion++;
            renderQuiz();
        }
    }

});


//Event Listener for Initials submission button
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    //Gets user initial value from text box
    var userInitial = document.querySelector("#initials").value;
    //Check to see if text box is empty on submit
    if (userInitial === "") {
        alert("Initials cannot be blank");
    } else {
        alert("Registered Successfully");
    }

    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(userInitial + "," + quizScore);

    //Stores initials and score in local storage to be used in High scores page

    localStorage.setItem('scores', JSON.stringify(scores));
});
