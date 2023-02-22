//Query Selector for score list
scoreListEl = document.querySelector(".score-list");

//Retrieving inital and scores 
var userScore = JSON.parse(localStorage.getItem("scores"));
var scoreList = [];

//Makesure local storage is not empty then calls updateScore function
if (userScore && userScore.length) {
    //call update scores and render scores functions 
    updateScores();
    renderScores();
}

//Update Score function to sort scores and update list 
function updateScores() {

    if (userScore.length > 1) {
        //sort list highest to lowest
        userScore.sort(function (a, b) {
            var parsedScoreA = a.split(',')[1];
            var parsedScoreB = b.split(',')[1];
            console.log(parsedScoreA);
            console.log(parsedScoreB);
            return ((parsedScoreA > parsedScoreB) ? -1 : ((parsedScoreA == parsedScoreB) ? 0 : 1));
        });
    }
}

console.log(userScore);

//function to create list items on score board and user name and score for each player 
function renderScores() {

    for (var i = 0; i < userScore.length; i++) {

        var ul = document.createElement('li');
        ul.textContent = userScore[i];
        ul.setAttribute("id", "list-item");
        scoreListEl.appendChild(ul);
    }
}