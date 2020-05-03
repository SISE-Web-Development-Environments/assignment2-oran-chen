var playing = false;
var currentCallback;

//windows
function replaceWindow(evt, param_div) {
    if (evt != "game"){
        pauseMusic();
    }
    stopInterval();
    clearCellsValue();
    clearWindow();
    document.getElementById(param_div).style.display = "block";
    evt.currentTarget.className += " active";
}

function clearWindow() {
    element = document.getElementsByClassName("tab");
    for (i = 0; i < element.length; i++) {
        element[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function clearCanvas() {
    element = document.getElementById('canvas');
    for (i = 0; i < element.length; i++) {
        element[i].style.display = "none";
    }
}

function showCanvas() {
    document.getElementById("startgame").className.replace("active", "");
    startGame();
    document.getElementById('canvas').style.display = "block";
    document.getElementById('reset').style.display = "block";

}

function reset() {
    setSettings();
    startGame();
    playMusic();
}

function clearCellsValue() {
    document.getElementById("lblScore").value = "";
    document.getElementById("lblTime").value = "";
    document.getElementById("lblLifes").value = "";
}

function resize_canvas() {
    canvas = document.getElementById("canvas");
    if (canvas.width < window.innerWidth) {
        canvas.width = window.innerWidth;
    }
    if (canvas.height < window.innerHeight) {
        canvas.height = window.innerHeight;
    }
}


//music
function playPause() {
    const song = document.getElementById("music");
    if (playing) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function pauseMusic(){
    const song = document.getElementById("music");
    song.pause();
    playing = false;
}

function playMusic() {
    const song = document.getElementById("music");
    song.play(); //play the audio track
    playing = true;
}

function playDieSound() {
    document.getElementById("diemusic").play();
}

function playWinSound() {
    document.getElementById("winmusic").play();
}

function playGhostSound() {
    document.getElementById("ghostmusic").play();
}

function pauseGame() {
    const song = document.getElementById("music");
    const pauseGame =  document.getElementById("pause");
    if(pause){
        //var temp = tempTime - start_time;
        //start_time = temp;
        pause = false;
        pauseGame.textContent = "Pause";
        playMusic();
    }
    else{
        //tempTime = new Date();
        pauseGame.textContent = "Resume";
        pause = true;
        pauseMusic();
    }
}

// override default browser alert
window.alert = function(msg, callback){
    $('.message').text(msg);
    // $('.customAlert').css('animation', 'fadeIn 0.3s linear');
    $('.customAlert').css('display', 'inline');
    setTimeout(function(){
        $('.customAlert').css('animation', 'none');
    }, 300);
    currentCallback = callback;
}

$(function(){
    // add listener for when our confirmation button is clicked
    $('.confirmButton').click(function(){
        $('.customAlert').css('animation', 'fadeOut 0.3s linear');
        setTimeout(function(){
            $('.customAlert').css('animation', 'none');
            $('.customAlert').css('display', 'none');
        }, 300);
        currentCallback();
    })

});