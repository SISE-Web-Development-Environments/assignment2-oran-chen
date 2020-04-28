//keys
function chooseRight() {
    $(document).keydown(function (event) {
        keyRight = event.keyCode;
        document.getElementById("rightkeybtn").innerText=event.key;
    });
}
function chooseLeft() {
    $(document).keydown(function (event) {
        keyLeft = event.keyCode;
        document.getElementById("leftkeybtn").innerText=event.key;
    });
}
function chooseDown() {
    $(document).keydown(function (event) {
        keyDown = event.keyCode;
        document.getElementById("downkeybtn").innerText=event.key;
    });
}
function chooseUp() {
    $(document).keydown(function (event) {
        keyUp = event.keyCode;
        document.getElementById("upkeybtn").innerText=event.key;
    });
}


