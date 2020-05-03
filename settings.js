var rightPressed;
var leftPressed;
var upPressed;
var downPressed;
var right= 'ArrowRight';
var left = 'ArrowLeft';
var up = 'ArrowUp';
var down = 'ArrowDown';

//choose keys
function chooseRight() {
    rightPressed = false;
    $(document).keydown(function (event) {
        if (rightPressed == false) {
            keyRight = event.keyCode;
            rightPressed = true;
            right = event.key;
            document.getElementById("rightkeybtn").innerText = right;
        }
    });
}

function chooseLeft() {
    leftPressed = false;
    $(document).keydown(function (event) {
        if (leftPressed == false) {
            keyLeft = event.keyCode;
            leftPressed = true
            left = event.key;
            document.getElementById("leftkeybtn").innerText = left;
        }
    });
}

function chooseDown() {
    downPressed = false;
    $(document).keydown(function (event) {
        if (downPressed == false) {
            keyDown = event.keyCode;
            downPressed = true;
            down = event.key;
            document.getElementById("downkeybtn").innerText = down;
        }
    });
}

function chooseUp() {
    upPressed = false;
    $(document).keydown(function (event) {
        if (upPressed == false) {
            keyUp = event.keyCode;
            upPressed = true;
            up = event.key;
            document.getElementById("upkeybtn").innerText = up;
        }
    });
}

$().ready(function () {
    $('#settingsform').validate({
        rules: {
            ballsnumin: {
                required: true,
            },
            timenumin: {
                required: true,
            },
            ghostsNumber:{
                required: true,
            }
        },
        messages: {
            ballsnumin:{
                required: "Please choose balls number (50-90)",
            },
            timenumin: {
                required: "Please choose time (min 60)",
            },
            ghostsNumber: {
                required: "Please choose ghosts number (1-4)",
            }
        },
        submitHandler: function () {
            var validSettings = $("#settingsform").valid();
            if (validSettings && checkDifferentKeys()) {
                $('#keyswarning').text("");
                setSettings();
                replaceWindow(event, 'game');
                showCanvas();
                playMusic();
            }
            if (checkDifferentKeys()==false)
                // setTimeout(function(){
                //     alert("Please select different keys", function(){
                //         console.log("Callback executed");
                //     });
                // }, 200);
                $('#keyswarning').text("Please select unique keys");
        }
    });
});

function checkDifferentKeys() {
 return keyRight != keyLeft && keyRight != keyUp && keyRight != keyDown && keyLeft != keyUp && keyLeft != keyDown && keyUp != keyDown;
}

function setSettings(){
    numOfBalls= $('#ballsnumin').val();
    sixtyPercentColor = $("#sixtyColor").val();
    thirtyPercentColor = $("#thirtyColor").val();
    tenPercentColor = $("#tenColor").val();
    numOfGhosts = $('#ghostsNumber :selected').val();
    time = $("#timenumin").val();
    showSettings();
}

function showSettings() {
    //debugger
    document.getElementById('showSettingsKeys').innerText=
        "* Keys: " + '\n'
        + '\t\t' + "RIGHT- " + right.valueOf() + '\n' + '\t\t' + "LEFT- " + left.valueOf()
        + '\n' + '\t\t' + "UP- " + up.valueOf() + '\n' + '\t\t' + "DOWN- " + down.valueOf()
        + '\n' + "* Balls colors: ";
    document.getElementById('showSettings5points').innerText= "5 points, ";
    document.getElementById('showSettings5points').style.color= sixtyPercentColor.valueOf();
    document.getElementById('showSettings10points').innerText= "15 points, ";
    document.getElementById('showSettings10points').style.color= thirtyPercentColor.valueOf();
    document.getElementById('showSettings15points').innerText= "25 points ";
    document.getElementById('showSettings15points').style.color= tenPercentColor.valueOf();
    document.getElementById('showSettingsNums').innerText= "* Balls #: " + numOfBalls.valueOf()
        + '\n' + "* Ghosts #: " + numOfGhosts.valueOf()
        + '\n' + "* Game time: " + time.valueOf();
}

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
