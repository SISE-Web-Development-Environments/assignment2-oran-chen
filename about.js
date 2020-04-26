
function about(){
    appear();
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        $("#about").fadeOut(50);
        replaceWindow(event, 'welcome');
    };
}

$(document).keydown(function(event) {
    debugger
    if (event.keyCode == 27) {
        $("#about").fadeOut(50);
        replaceWindow(event, 'welcome');
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    debugger
    modal = document.getElementById("about");
    if (event.target == modal) {
        $("#about").fadeOut(50);
        replaceWindow(event, 'welcome');
    }
}

function appear() {
    document.getElementById("about").style.display = "block";
}