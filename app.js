var context;
var shape = new Object();
var board;
var score;
var remain_lives;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var packBody = new Object();
packBody.x = 0.15;
packBody.y = 1.85;
var eye = new Object();
eye.x = 5;
eye.y = -15;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	remain_lives = 5;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
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
					board[i][j] = 1;
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
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}

	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 6; //Medicine

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
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLifes.value = remain_lives;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
		
			if (board[i][j] == 2) {
				if(GetKeyPressed() == 4){ //Right
					packBody.x = 0.15;
					packBody.y = 1.85;
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				}
				else if (GetKeyPressed() == 3){ //Left
					packBody.x = 1.15;
					packBody.y = 0.85;
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
				}
				else if(GetKeyPressed() == 2){ //Down
					packBody.x = 0.65;
					packBody.y = 0.35;
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
				}
				else if(GetKeyPressed() == 1){ // Up
					packBody.x = 1.65;
					packBody.y = 1.35;
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
				}
				else{
					context.beginPath();
					context.arc(center.x, center.y, 30, packBody.x * Math.PI, packBody.y * Math.PI); // half circle
				}
			
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				
				if(GetKeyPressed() == 2 || GetKeyPressed() == 1){
					eye.x = 15;
					eye.y = -5;
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
				}
				else if(GetKeyPressed() == 4 || GetKeyPressed() == 3){
					eye.x = 5;
					eye.y = -15;
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle	
				}
				else{
					context.arc(center.x + eye.x, center.y+eye.y, 5, 0, 2 * Math.PI); // circle
				}
				
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) { //Points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) { //Wall
				var img;
				//context.beginPath();
				//context.rect(center.x - 30, center.y - 30, 60, 60);
				//context.fillStyle = "grey"; //color
				//context.fill();
			
				img = document.getElementById("wall");
				context.drawImage(img, center.x - 30, center.y - 30,60,60);
			}
			else if(board[i][j] == 5){ //Ghost
				var img;
				img = document.getElementById("ghost");
				context.drawImage(img, center.x - 30, center.y - 30,60,60);
			}
			else if(board[i][j] == 6){ //Medicine
				var img;
				img = document.getElementById("medicine");
				context.drawImage(img, center.x - 30, center.y - 30,60,60);
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
	if (board[shape.i][shape.j] == 1) {
		score+= 2;
	}
	
	if (board[shape.i][shape.j] == 6) { // Medicine
		remain_lives += 1;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if(time_elapsed >= 60){ //Maximum time game
		window.clearInterval(interval);
		if(score < 100){
			window.alert("You are better than " + score + " points!");
		}
		else{
			window.alert("Winner!!!");
		}
	}
	else if (score >= 50) {
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} else if(remain_lives == 0){
		window.alert("Loser!");
	}
	else{
		Draw();
	}
}
