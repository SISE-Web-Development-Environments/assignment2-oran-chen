let rightPressed;
let leftPressed;
let upPressed;
let downPressed;
let playing = false;

//choose keys
function chooseRight() {
    rightPressed = false;
    $(document).keydown(function (event) {
        if (rightPressed == false) {
            keyRight = event.keyCode;
            rightPressed = true;
           document.getElementById("rightkeybtn").innerText = event.key;
        }
    });
}

function chooseLeft() {
    leftPressed = false;
    $(document).keydown(function (event) {
        if (leftPressed == false) {
            keyLeft = event.keyCode;
            leftPressed = true
            document.getElementById("leftkeybtn").innerText = event.key;
        }
    });
}

function chooseDown() {
    downPressed = false;
    $(document).keydown(function (event) {
        if (downPressed == false) {
            keyDown = event.keyCode;
            downPressed = true;
            document.getElementById("downkeybtn").innerText = event.key;
        }
    });
}

function chooseUp() {
    upPressed = false;
    $(document).keydown(function (event) {
        if (upPressed == false) {
            keyUp = event.keyCode;
            upPressed = true;
            document.getElementById("upkeybtn").innerText = event.key;
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
            if (validSettings) {
                setSettings();
                replaceWindow(event, 'game');
                showCanvas();
                playPause();
            }
        }
    });
});

function setSettings(){
    numOfBalls= $('#ballsnumin').val();
    sixtyPercentColor = $("#sixtyColor").val();
    thirtyPercentColor = $("#thirtyColor").val();
    tenPercentColor = $("#tenColor").val();
    numOfGhosts = $('#ghostsNumber :selected').val();
    time = $("#timenumin").val();
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

//music
function playPause() {
    const song = document.getElementById("music");
    if (playing==false) {
        song.play(); //play the audio track
        playing = true;
    } else {
        song.pause();
        playing = false;
    }
}