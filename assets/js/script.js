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
        question: 'Internal styles are written within the _____ element.',
        choice1: '<style>…</style>',
        choice2: '<css>…</css>',
        choice3: '<stylesheet>…</stylesheet>',
        choice4: 'Both A. and B.',
        answer: 'A',
    },
    {
        question: 'From the given options which is/are the valid way to represent a color?',
        choice1: 'A valid color name like "blue"',
        choice2: 'HEX code like "#0000ff"',
        choice3: 'RGB Value like "rgb(0,0,255)',
        choice4: 'All of the above',
        answer: 'D',
    },
    {
        question: 'Javascript is an _______ language?',
        choice1: 'Object-Oriented',
        choice2: 'Object-Based',
        choice3: 'Procedural',
        choice4: 'None of the above',
        answer: 'A',
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        choice1: 'getElementbyId()',
        choice2: 'getElementsByClassName()',
        choice3: 'Both A and B',
        choice4: 'None of the above',
        answer: 'C',
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choice1: 'document.write()',
        choice2: 'console.log()',
        choice3: 'window.alert()',
        choice4: 'All of the above',
        answer: 'D',
    },
    {
        question: 'CSS comments are placed within the ______.',
        choice1: '//',
        choice2: '/* and */',
        choice3: '<* and *>',
        choice4: '<! and !>',
        answer: 'B',
    },
    {
        question: 'Which property is used to define the font of the elements text?',
        choice1: 'font',
        choice2: 'font-family',
        choice3: 'font-style',
        choice4: 'All of the above',
        answer: 'B',
    },
    {
        question: 'When an operators value is NULL, the typeof returned by the unary operator is:',
        choice1: 'Boolean',
        choice2: 'Undefined',
        choice3: 'Object',
        choice4: 'Integer',
        answer: 'C',
    },
    {
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choice1: 'stringify()',
        choice2: 'parse()',
        choice3: 'convert()',
        choice4: 'None of the above',
        answer: 'A',
    },
    {
        question: 'What are the valid values of font-style property?',
        choice1: 'italic, bold, bolder',
        choice2: 'normal, bold, italic',
        choice3: 'underline, bold, italic',
        choice4: 'inherit, italic, normal, oblique',
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
            quizScore += 5;
            currentQuestion++;
            // calls render quiz function again to refresh to new question
            renderQuiz();
        } else {
            // If user choice was incorrect, timer decreases by 10 seconds
            if (timerCount >= 10) {
                timerCount = timerCount - 10;
            }
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
