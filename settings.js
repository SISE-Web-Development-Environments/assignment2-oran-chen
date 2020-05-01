let rightPressed;
let leftPressed;
let upPressed;
let downPressed;


//choose keys
function chooseRight() {
    rightPressed = false;
    $(document).keydown(function (event) {
        if (rightPressed == false) {
            keyRight = event.keyCode;
            rightPressed = true;
           $("#rightkeybtn").innerText = event.key;
        }
    });
}

function chooseLeft() {
    leftPressed = false;
    $(document).keydown(function (event) {
        if (leftPressed == false) {
            keyLeft = event.keyCode;
            leftPressed = true
            $("#leftkeybtn").innerText = event.key;
        }
    });
}

function chooseDown() {
    downPressed = false;
    $(document).keydown(function (event) {
        if (downPressed == false) {
            keyDown = event.keyCode;
            downPressed = true;
           $("#downkeybtn").innerText = event.key;
        }
    });
}

function chooseUp() {
    upPressed = false;
    $(document).keydown(function (event) {
        if (upPressed == false) {
            keyUp = event.keyCode;
            upPressed = true;
            $("#upkeybtn").innerText = event.key;
        }
    });
}

$().ready(function () {
    $('#settingsform').validate({
        rules: {
            ballsnumin: {
                required: true,
                regex: /^[5-8][0-9]$|^90$/
            }
        },
        messages: {
            ballsnumin:{
                required: "Please enter a number between 50 and 90",
                regex: "Please enter a number between 50 and 90"
            }
        },
        submitHandler: function () {
            debugger
            var validSettings = $("#settingsform").valid();
            if (validSettings) {
                numOfBalls = $('#ballsnumin').val();
               // $('#startgame').prop('disabled', false); //to enable playing the game
                replaceWindow(event, 'game');
                showCanvas();
            }
        }
    });
});

function randomInputs() {

    //Change number of balls
    var randomNumber = Math.random()*100;
    while (randomNumber < 50 || randomNumber > 90){
        randomNumber = Math.random()*100;
    }
    randomNumber = Math.floor(randomNumber);
    numOfBalls = randomNumber;
    document.getElementById('ballsnumin'). value = randomNumber;

    //Change colors
    document.getElementById('sixtyColor').value = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById('thirtyColor').value = "#"+((1<<24)*Math.random()|0).toString(16);
    document.getElementById('tenColor').value = "#"+((1<<24)*Math.random()|0).toString(16);

    //Change ghosts number
    document.getElementById('ghostsNumber').selectedIndex = Math.floor(Math.random() * 4);

    //Change time number
    randomNumber = Math.random()*100;
    while (randomNumber < 60){
        randomNumber = Math.random()*100;
    }
    randomNumber = Math.floor(randomNumber);
    document.getElementById('timenumin'). value = randomNumber;
}