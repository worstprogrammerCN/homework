var Init = function(){
	var gameOn = false;
	var is_placed = [[], [], [], []];

	var PuzzlePrepare = function(){
		var parts_frag = document.createDocumentFragment();
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++) {
				if (i == 3 && j == 3){
					is_placed[i][j] = 0;
					break;
				}
				else {
					is_placed[i][j] = 1;
					PartPrepare(i, j, parts_frag);
				}
					
			}
		}
		document.getElementById("puzzle").appendChild(parts_frag);
	}

	var PartPrepare = function(x, y, frag){
		var placed_x = x;
		var placed_y = y;
		var part = document.createElement("canvas");
		var panda = document.getElementById("panda");
		part.className = "part";
		part.id = x.toString() + y.toString();
		part.style.top = x * 90 + "px";
		part.style.left = y * 90 + "px";
		part.height = part.width = 90;
		part.getContext("2d").drawImage(panda, 90 * y, 90 * x, 90, 90, 0, 0, 90, 90);
		part.addEventListener("click", PartOnClick);
		frag.appendChild(part);
	}

	var PartOnClick = function(){
		if (!gameOn)
			return;
		var that = this;
		var x = parseInt(this.style.top) / 90;
		var y = parseInt(this.style.left) / 90;
		var nx = x;
		var ny = y;
		if (x - 1 >= 0 && is_placed[x - 1][y] == 0)
			nx = x - 1;
		else if (y - 1 >= 0 && is_placed[x][y - 1] == 0)
			ny = y - 1;
		else if (x + 1 < 4 && is_placed[x + 1][y] == 0)
			nx = x + 1;
		else if (y + 1 < 4 && is_placed[x][y + 1] == 0)
			ny = y + 1;	
		MoveTo.call(that, nx, ny);
	}

	var MoveTo = function(t_x, t_y){
		var that = this;
		var x = parseInt(this.style.top) / 90;
		var y = parseInt(this.style.left) / 90;
		var nx = t_x;
		var ny = t_y;
		var delta_x = (nx - x) * 90;
		var delta_y = (ny - y) * 90;
		is_placed[x][y] = 0;
		is_placed[nx][ny] = 1;
		var timer = setInterval(function(){
			if (parseInt(that.style.left) != ny * 90
			||  parseInt(that.style.top) != nx * 90){
				that.style.top = parseInt(that.style.top) + delta_x * 0.1 + "px";
				that.style.left = parseInt(that.style.left) + delta_y * 0.1 + "px";
			}
			else{
				clearInterval(timer);
				if (AllPlaced()){
					alert("you win!");
					gameOn = false;
				}
					
			}
		}, 5);
	}

	var AllPlaced = function(){
		var parts = document.getElementsByClassName("part");
		for(var i = 0; i < parts.length; i++) {
			var x = parseInt(parts[i].id[0]);
			var y = parseInt(parts[i].id[1]);
			if (parts[i].style.top != x * 90 + "px"
			|| parts[i].style.left != y * 90 + "px")
				return false;
		}
		return true;
	}

	var Disorder = function(){
		gameOn = true;
		var block = {
			"x" : 3,
			"y" : 3
		}
		var parts = [[], [], [], []];
		for(var i = 0; i < 4; i++)
			for(var j = 0; j < 4; j++){
				if (i == 3 && j == 3){
					parts[i][j] = block;
					break;
				}
				parts[i][j] = {
					id : i.toString() + j.toString()
				}
			}
		for(var i = 0; i < 10; i++){
			do{
				var dx = Math.floor(Math.random() * 3) - 1; 
				var dy = Math.floor(Math.random() * 3) - 1; 
				var nx = block.x + dx;
				var ny = block.y + dy;
			}while (nx < 0 || nx > 3 || ny < 0 || ny > 3 
					|| dx == dy || (dx != 0 && dy != 0));
			console.log(dx, dy);
			parts[block.x][block.y].id = "";
			parts[block.x][block.y].id += parts[block.x + dx][block.y + dy].id;  //is_placed?
			parts[block.x + dx][block.y + dy].id = "";
			is_placed[block.x][block.y] = 1;
			is_placed[block.x + dx][block.y + dy] = 0;
			block.x += dx;
			block.y += dy;
		}
		console.log(parts);
		for(var i = 0; i < 4; i++)
			for(var j = 0; j < 4; j++){
				if (parts[i][j].id == "")
					continue;
				var temp = document.getElementById(parts[i][j].id);
				temp.style.top = i * 90;
				temp.style.left = j * 90;
			}
		
	}

	var StartButtonPrepare = function(){
		var start_button = document.getElementById("start");
		start_button.addEventListener("click", Disorder);
	}

	PuzzlePrepare();
	Disorder();
	StartButtonPrepare();
}

Init();