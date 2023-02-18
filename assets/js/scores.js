//Query Selector for score list
scoreListEl = document.querySelector(".score-list");

//Retrieving inital and scores 
var userInitial = localStorage.getItem("Initials");
var userScore = localStorage.getItem("Score");

var highScores = [];

//Makesure local storage is not empty then calls updateScore function
if(userInitial != "" && userScore != "") {
updateScores();

}

//Update Score function to sort scores and update list 
function updateScores() {

var scoreEntry = userInitial.concat(' ', userScore);
highScores += scoreEntry;
console.log(highScores);

var li = document.createElement('li');
li.textContent = highScores;


scoreListEl.appendChild(li);

}