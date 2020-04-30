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