var gameOn = false;
var scores = 0;
var timeLeft = 0;
var gameGoesByTimer;
window.onload = function(){
	addSixtyMolesToFlat();
	startButtonPrepare();
}

var addSixtyMolesToFlat = function(){
	var flat = document.getElementById('flat');
	for(var i = 0; i < 60; i++) {
		var mole = document.createElement("div");
		mole.className = 'molesInHole';
		mole.addEventListener('click', HitTheMoleAndGainOrLoseOnePoint);
		flat.appendChild(mole);
	} 
}
/*start button*/
var startButtonPrepare = function(){
	var startButton = document.getElementById('start');
	startButton.addEventListener('click', startOrStopGame);
}

var startOrStopGame = function(){
	gameOn = !gameOn;
	if (gameOn) {
		var flat = document.getElementById('flat');
		for(var i = 0; i < flat.length; i++)
			flat[i].className = 'molesInHole';
		scores = 0;
		timeLeft = 5;
		printScores(scores);
		printTimeLeft(timeLeft);
		printGameStatus('playing');
		
		gameGoesByTimer = setInterval(gameTimeGoesBy, 1000);
		aMoleComeOut();
	}
	else 
		gameOver();
}

var gameTimeGoesBy = function(){
	timeLeft--;
	if (timeLeft == 0)
		gameOver();
	else
		printTimeLeft(timeLeft);
}


var gameOver = function(){
	alert('you scores are ' + scores);	
	clearInterval(gameGoesByTimer);				//stop the time going by
	
	var flag = document.getElementById('flat');	//init the moles
	var moles = flat.getElementsByTagName('div');	
	for(var i = 0; i < moles.length; i++){
		moles[i].className = 'molesInHole';
	}
	
	printGameStatus('game Over');
}

/* a mole come out and you can hit it*/
var aMoleComeOut = function(){
	var index = Math.floor(Math.random() * 59);
	var flat = document.getElementById('flat');
	var moles = flat.getElementsByTagName('div');
	moles[index].className = 'moleOutOfHole';
}

var HitTheMoleAndGainOrLoseOnePoint = function(){
	if (gameOn){
		if (this.className == 'moleOutOfHole'){
			scores++;
			this.className = 'molesInHole';
			aMoleComeOut();
		}
		else scores--;
		printScores(scores);
	}
}

/* functions to print information*/
var printScores = function(scores){
	var gameScores = document.getElementById('score');
	gameScores.value = scores.toString();		  
}

var printTimeLeft = function(timeLeft){
	var gameTime = document.getElementById('time');
	gameTime.value = timeLeft.toString(); 
}

var printGameStatus = function(gameStatus){
	var gameStatusDiv = document.getElementById('status');
	gameStatusDiv.value = gameStatus;	
}