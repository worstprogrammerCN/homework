hitThemoles();
function hitThemoles(){
	var game_on = false;
	var score = 0;
	var time_left = 0;
	var gameGoesByTimer;
	window.onload = function(){
		addSixtyMolesToFlat();
		startButtonPrepare();
	};

	var addSixtyMolesToFlat = function(){
		var frag = document.createDocumentFragment();
		var jquery_frag = $(frag);
		_.times(60, function(){
			var mole = $("<div></div>").addClass("molesInHole").click(hitTheMoleAndGainOrLoseOnePoint);
			jquery_frag.append(mole);
		})
		$("#flat").append(jquery_frag);
	}

	var startButtonPrepare = function(){
		$("#start").click(startOrStopGame);
	}

	var startOrStopGame = function(){
		game_on = !game_on;
		if (game_on) {
			$("#flat div").attr("molesInHole");
			score = 0;
			time_left = 20;
			$("#score").val(score);
			$("#time").val(time_left);
			$("#status").val("playing");
			gameGoesByTimer = setInterval(gameTimeGoesBy, 1000);
			aMoleComeOut();
		}
		else 
			gameOver();
	}

	var gameTimeGoesBy = function(){
		time_left--;
		$("#time").val(time_left);
		if (time_left == 0){
			game_on = !game_on;
			gameOver();
		}
			
	}

	var gameOver = function(){
		alert('you scores are ' + score);	
		clearInterval(gameGoesByTimer);				//stop the time going by
		
		var flag = document.getElementById('flat');	//init the moles
		var moles = flat.getElementsByTagName('div');
		$("#flat div").attr("class", "molesInHole");
		$("#status").val("game Over");
	}

	var hitTheMoleAndGainOrLoseOnePoint = function(){
		if (game_on){
			if ($(this).attr("class") == 'moleOutOfHole'){
				score++;
				$(this).attr("class", "molesInHole");
				aMoleComeOut();
			}
			else score--;
			$("#score").val(score);
		}
	}

	var aMoleComeOut = function(){
		var index = _.random(59);
		$($("#flat div")[index]).attr("class", "moleOutOfHole");
	}
};
