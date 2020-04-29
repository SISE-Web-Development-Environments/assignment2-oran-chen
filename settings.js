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

$().ready(function () {
//validate the register form on keyup and submit
    $('#setsettings').validate({
        rules: {
            numOfBallsInput:{
                required: true,
                regex: /^[0-9]{1,45}$/
            }

        },
        messages: {
            numOfBallsInput:"Please enter a number ctween 50 and 90"
        }
    });
});

