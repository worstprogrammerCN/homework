var Game = function(){
	//puzzle
	var Puzzle = function(){
		this.tilesPrepare();
		this.restartButtonPrepare();
	};

	var p = Puzzle.prototype;
	p.tilesPrepare = function(){
		this.tiles = [];
		this.game_on = false;
		this.shuffle = false;
		for(var i = 0; i < 15; i++)
			this.tiles.push(new Tile(i, this));
	};
	
	p.restartButtonPrepare = function(){  //模拟随机点击50次
		$("#start").on("click", function(){
			this.game_on = true;
			this.shuffle = true;
			for(var i = 0; i < 50; i++){
				var index = Math.floor(Math.random() * 15);
				this.tiles[index].$dom.click();
			}
			this.shuffle = false;
		}.bind(this))
		

	};

	p.allTilesAreInPlace = function(){
		for(var i = 0; i < this.tiles.length; i++)
			if (!this.tiles[i].isInPlace(i))
				return false;
		return true;
	}
	
	var blank = {
			row : 3,
			column : 3,
			index : 15
	};
	//tile
	var Tile = function(i, puzzle){
		this.$dom = $("#p" + i);
		this.row = Math.floor(i/4);
		this.column = i%4;
		this.$dom.css({
			"background-position": -this.column * 90 + "px " + -this.row * 90 + "px"
		});
		this.$dom.on("click", tileOnClick.bind(this, blank, puzzle));
	};

	var tileOnClick = function(blank, puzzle){
		if (!puzzle.game_on)
			return;
		if (this.row == blank.row && Math.abs(this.column - blank.column) == 1 || //若该图块与空白相邻
			this.column == blank.column &&  Math.abs(this.row - blank.row) == 1 ){
				this.$dom.attr("id", "p" + blank.index);
				swapRowAndColumn(this, blank);
				
				blank.index = blank.row * 4 + blank.column;
			if (puzzle.allTilesAreInPlace() && !puzzle.shuffle){
				setTimeout(function(){alert("you win!");}, 200);
				puzzle.game_on = false;
			}
				
		}
	};

	Tile.prototype.isInPlace = function(index){
		return this.row * 4 + this.column == index;
	}

	var swapRowAndColumn = function(a, b){
		var temp = a.row;
		a.row = b.row;
		b.row = temp;
				
		temp = a.column;
		a.column = b.column;
		b.column = temp;
	}
	

	$(function(){
		new Puzzle();
	});
};

Game();