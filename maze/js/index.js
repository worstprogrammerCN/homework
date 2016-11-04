var gameOn = false;
var cheat = false;
var p;
window.onload = function(){
	p = document.getElementById('words');
	startPrepare();
	endPrepare();
	wallsPrepare();
	mazePrepare();
}
/*addEventListener for each div*/
var startPrepare = function(){
	var start = document.getElementById('start');
	start.addEventListener('mouseover', startOnMouseOver);
}

var endPrepare = function(){
	var end = document.getElementById('end');
	end.addEventListener('mouseover', endOnMouseOver);
}

var wallsPrepare = function(){
	var walls = document.getElementsByClassName('wall');
	for(var i = 0; i < walls.length; i++) {
		walls[i].addEventListener('mouseover', wallOnMouseOver);
	}
}

var mazePrepare = function(){
	var maze = document.getElementById('maze');
	maze.addEventListener('mouseleave', mazeOnMouseLeave);
	maze.addEventListener('mouseOver', mazeOnMouseOver);
}

/*words ease in and out*/
var wordsEaseIn = function(obj, words){
	obj.innerHTML = words;
	var opa = 0;
	var timer = setInterval(function(){
		if (opa < 1){
			obj.style.opacity = opa.toString();
			opa += 0.1;
		}
		else
			clearInterval(timer);
			
	},30);
}

var wordsEaseOut = function(obj){
	var opa = 1.0;
	var timer = setInterval(function(){
		if (opa > 0){
			obj.style.opacity = opa.toString();
			opa -= 0.1;
		}
		else{
			clearInterval(timer);
			words = '';
		}
			
			
	},30);
	
}
/*function called when mouse over them*/
var wallOnMouseOver = function(){
	if (gameOn) {
		wordsEaseIn(p, 'you lose');//you lose
		gameOn = false;
		cheat = false;
	}
};

var startOnMouseOver = function(){
	wordsEaseOut(p);
	gameOn = true;
	cheat = false;
};

var endOnMouseOver = function(){
	if (gameOn) {
		if (!cheat) 
			wordsEaseIn(p, 'you succeed');//you succeed!
		else 
			wordsEaseIn(p, 'don\'t cheat.Keep you mouse inside the maze!');//you cheated!
		gameOn = false;
		cheat = false;	
	}
}

var mazeOnMouseLeave = function(){
	if (gameOn)
		cheat = true;
}

var mazeOnMouseOver = function(){
	cheat = false;
}