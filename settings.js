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
            document.getElementById("rightkeybtn").innerText = event.key;
        }
    });
}
function chooseLeft() {
    leftPressed = false;
    $(document).keydown(function (event) {
        if (leftPressed == false) {
            keyLeft = event.keyCode;
            leftPressed=true
            document.getElementById("leftkeybtn").innerText = event.key;
        }
    });
}
function chooseDown() {
    downPressed = false;
    $(document).keydown(function (event) {
        if(downPressed==false) {
            keyDown = event.keyCode;
            downPressed=true;
            document.getElementById("downkeybtn").innerText = event.key;
        }
    });
}
function chooseUp() {
    upPressed = false;
    $(document).keydown(function (event) {
        if (upPressed==false) {
            keyUp = event.keyCode;
            upPressed=true;
            document.getElementById("upkeybtn").innerText = event.key;
        }
    });
}




