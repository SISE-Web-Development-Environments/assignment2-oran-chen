var context;
var shape = new Object();
var board;
var dotsBoard;
var score;
var remain_lives;
var pac_color;
var sixtyPercentColor;
var thirtyPercentColor;
var tenPercentColor;
var start_time;
var time_elapsed;
var interval;
var ghostInterval;
var labelInterval;
var packBody = new Object();
var eye = new Object();
var numOfGhosts;
var ghostPosition;
var monsterLocation = new Object();
var remain_monster;
var keyUp;
var keyDown;
var keyRight;
var keyLeft;
// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function stopInterval(){
	clearInterval(interval);
	clearInterval(ghostInterval);
} 

function startGame() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	clearCanvas(context,canvas);
	Start();
}

function Start() {
	packBody.x = 0.15;
	packBody.y = 1.85;
	eye.x = 5;
	eye.y = -15;
	clearInterval(interval);
	clearInterval(ghostInterval);
	//clearInterval(labelInterval);
	board = new Array();
	dotsBoard = new Array();
	score = 0;
	remain_lives = 5;
	pac_color = "yellow";
	sixtyPercentColor = "blue";
	thirtyPercentColor = "red";
	tenPercentColor = "green";
	numOfGhosts = 4;
	ghostPosition = new Array(numOfGhosts);
	initializeGhostPos();
	var cnt = 100;
	var food_remain = 50;
	var numSixtyPercent = food_remain*0.6;
	var numThirtyPercent = food_remain*0.3;
	var numTenPercent = food_remain*0.1;
	var pacman_remain = 1;
	remain_monster = 1;

	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		dotsBoard[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) || 
				(i == 5 && j == 8) ||
				(i == 6 && j == 8) ||
				(i == 7 && j == 8) 
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					var num = Math.random();

					if(num < 0.6){
						numSixtyPercent--;
						dotsBoard[i][j] = 1;
					}
					else if(num < 0.9){
						numThirtyPercent--;
						dotsBoard[i][j] = 2;
					}
					else{
						numTenPercent--;
						dotsBoard[i][j] = 3;
					}

				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var num = Math.random();

		if(num < 0.6){
			numSixtyPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 1;
		}
		else if(num < 0.9){
			numThirtyPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 2;
		}
		else{
			numTenPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 3;
		}
		food_remain--;
	}

	// var emptyCell = findRandomEmptyCell(board);
	// board[emptyCell[0]][emptyCell[1]] = 6; //Medicine

	placeGhosts();
	monsterLocation.i = 1;
	monsterLocation.j = 1;

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);
	ghostInterval = setInterval(updateGhostPosition, 800);
	//labelInterval = setInterval(updateLabels, 10);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}	
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;

			if (board[i][j] == 2) {
				if (GetKeyPressed() == 4) { //Right
					packBody.x = 0.15;
					packBody.y = 1.85;
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				} else if (GetKeyPressed() == 3) { //Left
					packBody.x = 1.15;
					packBody.y = 0.85;
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
				} else if (GetKeyPressed() == 2) { //Down
					packBody.x = 0.65;
					packBody.y = 0.35;
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
				} else if (GetKeyPressed() == 1) { // Up
					packBody.x = 1.65;
					packBody.y = 1.35;
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				} else {
					context.beginPath();
					context.arc(center.x, center.y, 30, packBody.x * Math.PI, packBody.y * Math.PI); // half circle
				}

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();

				if (GetKeyPressed() == 2 || GetKeyPressed() == 1) {
					eye.x = 15;
					eye.y = -5;
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
				} else if (GetKeyPressed() == 4 || GetKeyPressed() == 3) {
					eye.x = 5;
					eye.y = -15;
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle	
				} else {
					context.arc(center.x + eye.x, center.y + eye.y, 5, 0, 2 * Math.PI); // circle
				}

				context.fillStyle = "black"; //color
				context.fill();
			} else if ((dotsBoard[i][j] == 1 || dotsBoard[i][j] == 2 || dotsBoard[i][j] == 3) && board[i][j] != 5 && board[i][j] != 7) { //Points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle

				if(dotsBoard[i][j] == 1){
					context.fillStyle = sixtyPercentColor; //color
				}
				else if (dotsBoard[i][j] == 2){
					context.fillStyle = thirtyPercentColor; //color
				}
				else if(dotsBoard[i][j] == 3){
					context.fillStyle = tenPercentColor; //color
				}

				context.fill();
			} else if (board[i][j] == 4) { //Wall
				var img;
				//context.beginPath();
				//context.rect(center.x - 30, center.y - 30, 60, 60);
				//context.fillStyle = "grey"; //color
				//context.fill();

				img = document.getElementById("wall");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			} else if (board[i][j] == 5) { //Ghost
				var img;
				img = document.getElementById("ghost");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			}
			else if (board[i][j] == 6) { //Medicine
				var img;
				img = document.getElementById("medicine");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			}
			else if (board[i][j] == 7) { //Cute monster
				var img;
				img = document.getElementById("mon");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (dotsBoard[shape.i][shape.j] == 1) {
		score+= 5;
		dotsBoard[shape.i][shape.j] = 0;
	}
	else if(dotsBoard[shape.i][shape.j] == 2){
		score+= 15;
		dotsBoard[shape.i][shape.j] = 0;
	}
	else if(dotsBoard[shape.i][shape.j] == 3){
		score+= 25;
		dotsBoard[shape.i][shape.j] = 0;
	}
	
	if (board[shape.i][shape.j] == 6) { // Medicine
		remain_lives += 1;
	}

	if (board[shape.i][shape.j] == 7) { // Monster
		score = score + 50;
		remain_monster--;
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if(eatMeGhost()){
		remain_lives--;
		score = score - 10;
		board[shape.i][shape.j] = 0;
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		deleteGhosts();
		placeGhosts();
	}

	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLifes.value = remain_lives;

	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if(time_elapsed >= 60){ //Maximum time game
		window.clearInterval(interval);
		if(score < 100){
			setTimeout(function () {window.alert("You are better than " + score + " points!");},50);
		}
		else{
				setTimeout(function () {window.alert("Winner!!!");},50);
		}
	}
	else if (score >= 100) {
		window.clearInterval(interval);
		setTimeout(function () {window.alert("Winner!!!");},50);

	} else if(remain_lives == 0){

		setTimeout(function () {
			window.alert("Loser!");
			window.clearInterval(interval);
		},50);
	}
	else{
		Draw();
	}
}

function placeGhosts() {
	board[0][0] = 5; // First ghost
	ghostPosition[0][0] = 0;
	ghostPosition[0][1] = 0;
	if(numOfGhosts == 2){
		board[0][9] = 5;
		ghostPosition[1][0] = 0;
		ghostPosition[1][1] = 9;
	}
	else if(numOfGhosts == 3){
		board[0][9] = 5;
		board[9][9] = 5;
		ghostPosition[1][0] = 0;
		ghostPosition[1][1] = 9;
		ghostPosition[2][0] = 9;
		ghostPosition[2][1] = 9;
	}
	else if(numOfGhosts == 4){
		board[0][9] = 5;
		board[9][9] = 5;
		board[9][0] = 5;
		ghostPosition[1][0] = 0;
		ghostPosition[1][1] = 9;
		ghostPosition[2][0] = 9;
		ghostPosition[2][1] = 9;
		ghostPosition[3][0] = 9;
		ghostPosition[3][1] = 0;
	}
}

function updateGhostPosition(){
	var num;
	var direction;
	for (var i =0; i < numOfGhosts; i++) {
		num = Math.random();
		board[ghostPosition[i][0]][ghostPosition[i][1]] = 0;
		if (num < 0.2) {
			direction = getRandomDirection();

			if(direction == 1){ //Up
				if(ghostPosition[i][1] - 1 > 0 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 4){
					ghostPosition[i][1]--;
				}
			}
			else if(direction == 2){ //Down
				if(ghostPosition[i][1] + 1 < 9 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 4){
					ghostPosition[i][1]++;
				}
			}
			else if(direction == 3){ //Left
				if(ghostPosition[i][0] - 1 > 0 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 4){
					ghostPosition[i][0]--;
				}
			}
			else if(direction == 4){ //Right
				if(ghostPosition[i][0] + 1 < 9 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 4){
					ghostPosition[i][0]++;
				}
			}
		} else {
			let currentDistance = distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1]);
			if (currentDistance > distanceSum(shape.i, ghostPosition[i][0] + 1, shape.j, ghostPosition[i][1]) &&
				board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 4) {
				ghostPosition[i][0]++;
			} else if (currentDistance > distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1] + 1) &&
				board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 4) {
				ghostPosition[i][1]++;
			} else if (currentDistance > distanceSum(shape.i, ghostPosition[i][0] - 1, shape.j, ghostPosition[i][1]) &&
				board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 4) {
				ghostPosition[i][0]--;
			} else if (currentDistance > distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1] - 1) &&
				board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 4) {
				ghostPosition[i][1]--;
			}
		}
		board[ghostPosition[i][0]][ghostPosition[i][1]] = 5;
	}


	if(remain_monster > 0) {
		//Update monster move
		direction = getRandomDirection();
		board[monsterLocation.i][monsterLocation.j] = 0;
		if (direction == 1) { //Up

			if (monsterLocation.j - 1 > 0 && board[monsterLocation.i][monsterLocation.j - 1] != 4) {
				monsterLocation.j--;
			}
		} else if (direction == 2) { //Down
			if (monsterLocation.j + 1 < 9 && board[monsterLocation.i][monsterLocation.j + 1] != 4) {
				monsterLocation.j++;
			}
		} else if (direction == 3) { //Left
			if (monsterLocation.i - 1 > 0 && board[monsterLocation.i - 1][monsterLocation.j] != 4) {
				monsterLocation.i--;
			}
		} else if (direction == 4) { //Right
			if (monsterLocation.i + 1 < 9 && board[monsterLocation.i + 1][monsterLocation.j] != 4) {
				monsterLocation.i++;
			}
		}
		board[monsterLocation.i][monsterLocation.j] = 7;
	}
}

function distanceSum(x1,x2,y1,y2){
	return (Math.abs(x1-x2) + Math.abs(y1-y2));
}

function initializeGhostPos(){
	for (var i =0; i < numOfGhosts; i++) {
		ghostPosition[i] = new Array(2);
	}
}

function eatMeGhost(){
	for (var i =0; i < numOfGhosts; i++) {
		if(shape.i == ghostPosition[i][0] && shape.j == ghostPosition[i][1]){
			return true;
		}
	}

	return false;
}

function deleteGhosts(){
	for (var i =0; i < numOfGhosts; i++) {
		board[ghostPosition[i][0]][ghostPosition[i][1]] = 0;
	}
	board[monsterLocation.i][monsterLocation.j] = 0;
}



function getRandomDirection () {
	var probabilities = [0.25, 0.25, 0.25, 0.25];
	var results = [1, 2, 3, 4];
	var num = Math.random();
	sum = 0;

	for (var i = 0; i < probabilities.length -1; i++) {
		sum += probabilities[i];
		if (num < sum) {
			return results[i];
		}
	}

	return results[3];
}

function updateLabels() {
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLifes.value = remain_lives;
}