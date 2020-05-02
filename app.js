var context;
var shape = new Object();
var board = [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
			 [4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,4],
			 [4,0,4,4,4,4,0,4,0,4,4,4,0,4,4,0,4,4,0,4],
			 [4,0,0,0,0,4,0,4,0,0,0,4,0,4,4,0,4,0,0,4],
			 [4,0,4,4,0,4,0,4,4,4,4,4,0,4,4,0,4,4,0,4],
			 [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
			 [4,0,4,4,4,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4],
			 [4,0,4,4,4,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4],
			 [4,0,0,0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0,4],
			 [4,0,0,0,0,0,0,4,4,4,4,4,0,4,4,0,4,4,4,4],
			 [4,4,4,0,4,4,0,4,4,4,4,4,0,4,4,0,4,4,4,4],
			 [4,0,0,0,0,4,0,4,4,0,0,0,0,0,0,0,0,0,0,4],
			 [4,0,0,0,0,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4],
			 [4,0,0,0,0,4,0,4,4,0,4,4,0,0,0,0,4,4,0,4],
			 [4,0,0,0,0,4,0,0,0,0,4,4,0,0,0,0,4,4,0,4],
			 [4,0,0,0,0,4,0,4,4,0,0,0,0,0,0,0,4,4,0,4],
			 [4,0,0,0,0,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4],
			 [4,0,0,0,0,4,0,4,4,0,0,0,0,0,0,0,0,0,0,4],
			 [4,0,0,0,0,0,0,4,4,0,4,4,4,4,4,4,4,4,0,4],
			 [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]];
var dotsBoard;
var score;
var remain_lives;
var pac_color;
var sixtyPercentColor;
var thirtyPercentColor;
var tenPercentColor;
//var start_time;
//var time_elapsed;
var interval;
var ghostInterval;
var checkInterval;
var timeInterval;
var packBody = new Object();
var eye = new Object();
var numOfGhosts;
var ghostPosition;
var monsterLocation = new Object();
var remain_monster;
var keyRight= 39;
var keyLeft = 37;
var keyUp = 38;
var keyDown = 40;
var time;
var numOfBalls;
var pause;
var seconds;
var currentFood;
// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function stopInterval(){
	clearInterval(interval);
	clearInterval(ghostInterval);
	clearInterval(checkInterval)
	clearInterval(timeInterval);
}

function startGame() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = canvas.width;
	clearCanvas(context,canvas);
	//canvas.style.width = window.innerWidth;
	//canvas.style.height = window.innerHeight;
	Start();
}

function Start() {
	pause = false;
	packBody.x = 0.15;
	packBody.y = 1.85;
	eye.x = 5;
	eye.y = -10;
	clearInterval(interval);
	clearInterval(ghostInterval);
	clearInterval(checkInterval);
	clearInterval(timeInterval);

	//clearInterval(labelInterval);
	//board = new Array();
	dotsBoard = new Array();
	score = 0;
	remain_lives = 5;
	pac_color = "yellow";
	var food_remain= numOfBalls;
	currentFood = numOfBalls;
	ghostPosition = new Array(numOfGhosts);
	initializeGhostPos();
	placeGhosts();
	monsterLocation.i = 1;
	monsterLocation.j = 3;
	var cnt = 400;
	var numSixtyPercent = food_remain*0.6;
	var numThirtyPercent = food_remain*0.3;
	var numTenPercent = food_remain*0.1;
	var pacman_remain = 1;
	remain_monster = 1;
	seconds = 0;
	//tempTime = new Date();
	start_time = new Date();
	for (var i = 0; i < 20; i++) {
		//board[i] = new Array();
		dotsBoard[i] = new Array();

		for (var j = 0; j < 20; j++) {
				if (board[i][j] != 4){
					board[i][j] = 0;
				}
				dotsBoard[i][j] = board[i][j];
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt && board[i][j] != 4 && board[i][j] != 5 && board[i][j] != 7) {
					//food_remain--;

					var num = Math.random();

					if(num < 0.6 && numSixtyPercent > 0 ){
						numSixtyPercent--;
						food_remain--;
						dotsBoard[i][j] = 1;
					}
					else if(num < 0.9 && numThirtyPercent > 0){
						numThirtyPercent--;
						food_remain--;
						dotsBoard[i][j] = 2;
					}
					else if(numTenPercent > 0){
						numTenPercent--;
						food_remain--;
						dotsBoard[i][j] = 3;
					}

				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt && board[i][j] != 4) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else if (board[i][j] != 4) {
					board[i][j] = 0;
					dotsBoard[i][j] = 0;
				}
				cnt--;
			//}
		}
	}

	if(pacman_remain > 0){
		var emptyCell = findRandomEmptyCell();
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
	}

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell();

		if(numSixtyPercent > 0){
			numSixtyPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 1;
		}
		else if(numThirtyPercent > 0){
			numThirtyPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 2;
		}
		else{
			numTenPercent--;
			dotsBoard[emptyCell[0]][emptyCell[1]] = 3;
		}
		food_remain--;
	}

	// for (var i = 0; i < 20; i++) {
	// 	for (var j = 0; j < 20; j++) {
	// 		if(board[i][j] == 4 && (dotsBoard[i][j] == 1 || dotsBoard[i][j] == 2 || dotsBoard[i][j] == 3)){
	// 			window.alert("collpas!!");
	// 		}
	// 	}
	// }
	// var emptyCell = findRandomEmptyCell(board);
	// board[emptyCell[0]][emptyCell[1]] = 6; //Medicine



	var emptyCell = findRandomEmptyCell();
	dotsBoard[emptyCell[0]][emptyCell[1]] = 6; // Eatable monster

	emptyCell = findRandomEmptyCell();
	dotsBoard[emptyCell[0]][emptyCell[1]] = 8;// Clock

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
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
	interval = setInterval(UpdatePosition, 150);
	ghostInterval = setInterval(updateGhostPosition, 400);
	checkInterval = setInterval(isEatPackman, 50);
	timeInterval = setInterval(function () {
		if(!pause){
			seconds++;
		}}, 1000);
}

function findRandomEmptyCell() {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0 || dotsBoard[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	//up
	if (keysDown[keyUp]) {
		return 1;
	}
	//down
	if (keysDown[keyDown]) {
		return 2;
	}
	//left
	if (keysDown[keyLeft]) {
		return 3;
	}
	//right
	if (keysDown[keyRight]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board

	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;

			if (board[i][j] == 2) {
				if (GetKeyPressed() == 4) { //Right
					packBody.x = 0.15;
					packBody.y = 1.85;
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				} else if (GetKeyPressed() == 3) { //Left
					packBody.x = 1.15;
					packBody.y = 0.85;
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
				} else if (GetKeyPressed() == 2) { //Down
					packBody.x = 0.65;
					packBody.y = 0.35;
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
				} else if (GetKeyPressed() == 1) { // Up
					packBody.x = 1.65;
					packBody.y = 1.35;
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				} else {
					context.beginPath();
					context.arc(center.x, center.y, 15, packBody.x * Math.PI, packBody.y * Math.PI); // half circle
				}

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();

				if (GetKeyPressed() == 2 || GetKeyPressed() == 1) {
					eye.x = 10;
					eye.y = -5;
					context.arc(center.x + 10, center.y - 5, 3, 0, 2 * Math.PI); // circle
				} else if (GetKeyPressed() == 4 || GetKeyPressed() == 3) {
					eye.x = 5;
					eye.y = -10;
					context.arc(center.x + 5, center.y - 10, 3, 0, 2 * Math.PI); // circle
				} else {
					context.arc(center.x + eye.x, center.y + eye.y, 3, 0, 2 * Math.PI); // circle
				}

				context.fillStyle = "black"; //color
				context.fill();
			} else if ((dotsBoard[i][j] == 1 || dotsBoard[i][j] == 2 || dotsBoard[i][j] == 3) && board[i][j] != 5 && board[i][j] != 7) { //Points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle

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
				context.drawImage(img, center.x - 15, center.y - 15, 30, 30);
			} else if (board[i][j] == 5) { //Ghost
				var img;
				img = document.getElementById("ghost");
				context.drawImage(img, center.x - 15, center.y - 15, 30, 30);
			}
			else if (dotsBoard[i][j] == 6) { //Medicine
				var img;
				img = document.getElementById("medicine");
				context.drawImage(img, center.x - 15, center.y - 15, 30, 30);
			}
			else if (board[i][j] == 7) { //Cute monster
				var img;
				img = document.getElementById("mon");
				context.drawImage(img, center.x - 15, center.y - 15, 30, 30);
			}
			else if (dotsBoard[i][j] == 8) { //Clock
				var img;
				img = document.getElementById("clock");
				context.drawImage(img, center.x - 15, center.y - 15, 30, 30);
			}
		}
	}
}

function UpdatePosition() {
	//start_time = tempTime;
	if(!pause) {
		board[shape.i][shape.j] = 0;
		var x = GetKeyPressed();
		if (x == 1) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
			}
		}
		if (x == 2) {
			if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {
			if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}
		if (dotsBoard[shape.i][shape.j] == 1) {
			score += 5;
			dotsBoard[shape.i][shape.j] = 0;
			currentFood--;
		} else if (dotsBoard[shape.i][shape.j] == 2) {
			score += 15;
			dotsBoard[shape.i][shape.j] = 0;
			currentFood--;
		} else if (dotsBoard[shape.i][shape.j] == 3) {
			score += 25;
			dotsBoard[shape.i][shape.j] = 0;
			currentFood--;
		}

		if (dotsBoard[shape.i][shape.j] == 6) { // Medicine
			remain_lives += 1;
			dotsBoard[shape.i][shape.j] = 0;
		}

		if (dotsBoard[shape.i][shape.j] == 8) { // Clock
			time = parseInt(time) + 10;
			showSettings();
			dotsBoard[shape.i][shape.j] = 0;
		}

		board[shape.i][shape.j] = 2;
		//var currentTime = new Date();
		//time_elapsed = (currentTime - start_time) / 1000;
		//time_elapsed += tempTime;

		if(remain_monster > 0) {
			if (monsterLocation.i == shape.i && monsterLocation.j == shape.j) { // Monster
				score = score + 50;
				remain_monster--;
				board[shape.i][shape.j] = 0;
				//board[monsterLocation.i][monsterLocation.j] = 0;
			}
		}
		lblScore.value = score;
		lblTime.value = seconds;
		lblLifes.value = remain_lives;

		if (score >= 20 && seconds <= 10) {
			pac_color = "green";
		}

		if (seconds >= time) { //Maximum time game
			window.clearInterval(interval);
			if (score < 100) {
				setTimeout(function () {
					window.alert("You are better than " + score + " points!");
				}, 50);
			} else {
				setTimeout(function () {
					window.alert("Winner!!!");
				}, 50);
			}
		}
		if(currentFood == 0){
			window.clearInterval(interval);
			setTimeout(function () {
				window.alert("Winner!!!");
			}, 50);
		}
		// else if (score >= 100) {
		// 	window.clearInterval(interval);
		// 	setTimeout(function () {window.alert("Winner!!!");},50);
		//
		// } else
		if (remain_lives == 0) {
			setTimeout(function () {
				window.alert("Loser!");
				window.clearInterval(interval);
			}, 50);
		} else {
			Draw();
		}
	}
}
function isEatPackman() {

	// if(remain_monster > 0) {
	// 	if (monsterLocation.i == shape.i && monsterLocation.j == shape.j) { // Monster
	// 		score = score + 50;
	// 		remain_monster--;
	// 		board[shape.i][shape.j] = 0;
	// 		//board[monsterLocation.i][monsterLocation.j] = 0;
	// 	}
	// }
	if (eatMeGhost()) {
		remain_lives--;
		score = score - 10;
		board[shape.i][shape.j] = 0;
		var emptyCell = findRandomEmptyCell();
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		deleteGhosts();
		placeGhosts();
	}
	Draw();
}
function placeGhosts() {
	board[1][1] = 5; // First ghost
	ghostPosition[0][0] = 1;
	ghostPosition[0][1] = 1;
	if(numOfGhosts == 2){
		board[1][18] = 5;
		ghostPosition[1][0] = 1;
		ghostPosition[1][1] = 18;
	}
	else if(numOfGhosts == 3){
		board[1][18] = 5;
		board[18][18] = 5;
		ghostPosition[1][0] = 1;
		ghostPosition[1][1] = 18;
		ghostPosition[2][0] = 18;
		ghostPosition[2][1] = 18;
	}
	else if(numOfGhosts == 4){
		board[1][18] = 5;
		board[18][18] = 5;
		board[18][1] = 5;
		ghostPosition[1][0] = 1;
		ghostPosition[1][1] = 18;
		ghostPosition[2][0] = 18;
		ghostPosition[2][1] = 18;
		ghostPosition[3][0] = 18;
		ghostPosition[3][1] = 1;
	}
}

function updateGhostPosition(){
	if(!pause) {
		var num;
		var direction;
		for (var i = 0; i < numOfGhosts; i++) {
			num = Math.random();
			board[ghostPosition[i][0]][ghostPosition[i][1]] = 0;
			if (num < 0.3) {
				// direction = getRandomDirection();
				//
				// if (direction == 1) { //Up
				// 	if (ghostPosition[i][1] - 1 >= 0 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 4 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 5) {
				// 		ghostPosition[i][1]--;
				// 	}
				// } else if (direction == 2) { //Down
				// 	if (ghostPosition[i][1] + 1 < 20 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 4 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 5) {
				// 		ghostPosition[i][1]++;
				// 	}
				// } else if (direction == 3) { //Left
				// 	if (ghostPosition[i][0] - 1 >= 0 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 4 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 5) {
				// 		ghostPosition[i][0]--;
				// 	}
				// } else if (direction == 4) { //Right
				// 	if (ghostPosition[i][0] + 1 < 20 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 4 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 5) {
				// 		ghostPosition[i][0]++;
				// 	}
				// }
				var newLication = randomDirection(ghostPosition[i][0], ghostPosition[i][1]);
				ghostPosition[i][0] = newLication[0];
				ghostPosition[i][1] = newLication[1];
			} else {
				let currentDistance = distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1]);
				if (currentDistance >= distanceSum(shape.i, ghostPosition[i][0] + 1, shape.j, ghostPosition[i][1]) &&
					board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 4 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 5 &&
					ghostPosition[i][0] + 1 < 20 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 7) {
					ghostPosition[i][0]++;
				} else if (currentDistance >= distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1] + 1) &&
					board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 4 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 5 &&
					ghostPosition[i][1] + 1 < 20 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 7) {
					ghostPosition[i][1]++;
				} else if (currentDistance >= distanceSum(shape.i, ghostPosition[i][0] - 1, shape.j, ghostPosition[i][1]) &&
					board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 4 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 5 &&
					ghostPosition[i][0] - 1 >= 0 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 7) {
					ghostPosition[i][0]--;
				} else if (currentDistance >= distanceSum(shape.i, ghostPosition[i][0], shape.j, ghostPosition[i][1] - 1) &&
					board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 4 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 5 &&
					ghostPosition[i][1] - 1 >= 0 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 7) {
					ghostPosition[i][1]--;
				}
				else{
					var newLication = randomDirection(ghostPosition[i][0], ghostPosition[i][1]);
					ghostPosition[i][0] = newLication[0];
					ghostPosition[i][1] = newLication[1];
				}
			}
			board[ghostPosition[i][0]][ghostPosition[i][1]] = 5;
		}

		//Update monster move
		if (remain_monster > 0) {

			// direction = getRandomDirection();
			 board[monsterLocation.i][monsterLocation.j] = 0;
			var newLication = randomDirection(monsterLocation.i, monsterLocation.j);
			monsterLocation.i = newLication[0];
			monsterLocation.j = newLication[1];
			// if (direction == 1) { //Up
			//
			// 	if (monsterLocation.j - 1 >= 0 && board[monsterLocation.i][monsterLocation.j - 1] != 4 && board[monsterLocation.i][monsterLocation.j - 1] != 5) {
			// 		monsterLocation.j--;
			// 	}
			// } else if (direction == 2) { //Down
			// 	if (monsterLocation.j + 1 < 20 && board[monsterLocation.i][monsterLocation.j + 1] != 4 && board[monsterLocation.i][monsterLocation.j + 1] != 4) {
			// 		monsterLocation.j++;
			// 	}
			// } else if (direction == 3) { //Left
			// 	if (monsterLocation.i - 1 >= 0 && board[monsterLocation.i - 1][monsterLocation.j] != 4 && board[monsterLocation.i - 1][monsterLocation.j] != 4) {
			// 		monsterLocation.i--;
			// 	}
			// } else if (direction == 4) { //Right
			// 	if (monsterLocation.i + 1 < 20 && board[monsterLocation.i + 1][monsterLocation.j] != 4 && board[monsterLocation.i + 1][monsterLocation.j] != 4) {
			// 		monsterLocation.i++;
			// 	}
			// }
			board[monsterLocation.i][monsterLocation.j] = 7;
		}

		if (board[shape.i][shape.j] == 7) { // Monster
			score = score + 50;
			remain_monster--;
			board[shape.i][shape.j] = 0;
			board[monsterLocation.i][monsterLocation.j] = 0;
		}
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

function randomDirection(i,j){
	var tempX = i;
	var tempY = j;

	//while(tempX == i && tempY == j) {
		var direction = getRandomDirection();
		if (direction == 1) { //Up
			if (j - 1 >= 0 && board[i][j - 1] != 4 && board[i][j - 1] != 5 && board[i][j - 1] != 7) {
				j--;
				//break;
			}
		} else if (direction == 2) { //Down
			if (j + 1 < 20 && board[i][j + 1] != 4 && board[i][j + 1] != 5 && board[i][j - 1] != 7) {
				j++;
				//break;
			}
		} else if (direction == 3) { //Left
			if (i - 1 >= 0 && board[i - 1][j] != 4 && board[i - 1][j] != 5 && board[i][j - 1] != 7) {
				i--;
				//break;
			}
		} else if (direction == 4) { //Right
			if (i + 1 < 20 && board[i + 1][j] != 4 && board[i + 1][j] != 5 && board[i][j - 1] != 7) {
				i++;
				//break;
			}
		}
	//	setTimeout(function(){ break; }, 3000);
//	}

	return [i,j];
}

