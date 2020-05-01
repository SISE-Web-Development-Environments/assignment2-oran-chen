
function about(){
    appear();
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        $("#about").fadeOut(50);
    };
}

$(document).keydown(function(event) {
    if (event.keyCode == 27) {
        $("#about").fadeOut(50);
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    modal = document.getElementById("about");
    if (event.target == modal) {
        $("#about").fadeOut(50);
    }
}

function appear() {
    document.getElementById("about").style.display = "block";
}