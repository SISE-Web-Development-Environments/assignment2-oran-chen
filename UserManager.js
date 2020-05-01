
var session_user;

//Define the user class
class User{
    //define the variables of the user
    username;
    password;
    fullname;
    email;
    bday;
    bmonth;
    byear;

    //initialize the parameters from the dictionary received
    constructor( parameters={} ) {
        this.username = parameters.username;
        this.password = parameters.password;
        this.fullname = parameters.fullname;
        this.email = parameters.email;
        this.bday = parameters.bday;
        this.bmonth = parameters.bmonth;
        this.byear = parameters.byear;
    }
}

//init
$(document).ready(function () {
    //store users in the session storage
    var pUser = new User({username:'p', password:'p', fullname:'p_p', email:'p_p@gmail.com'});
    //default user - p
    sessionStorage.setItem(pUser.username, JSON.stringify(pUser));
    document.getElementById('front_display').innerHTML = "Please login/register to start the game ";
})

function userManagerRegSubmit() {
    //get values from the register fields
    let passwordR = $('#psw_reg').val();
    let usernameR = $('#uname_reg').val();
    let fullnameR = $('#fname_reg').val();
    let emailR = $('#email_reg').val();
    let bdayR = $('#Bday').val();
    let bmonthR = $('#Bmonth').val();
    let byearR = $('#Byear').val();
    debugger
    let newuser = new User({username:usernameR, password:passwordR, fullname:fullnameR, email:emailR,
        bday:bdayR, bmonth:bmonthR, byear:byearR});
    if(!addUserToStorage(newuser)){
        alert("Username already exist!");
    }else{
        transferToLogin(usernameR, passwordR);
    }
}

function transferToLogin(username,password){
    //if a user with such user name and password does not exist
    if(!validateUserExists(username, password)){
        alert("The user doesn't exist in the system, please enter the details again");
    }else{ //does exist, connect him
        session_user = JSON.parse(sessionStorage.getItem(username));
        $('#tabS').prop('disabled', false); //to enable playing the game
        document.getElementById('front_display').innerHTML = "The user " + session_user.username + " is currently logged in.";
        document.getElementById("settingsform").reset();
        replaceWindow(event, 'settings');
    }
}

//add a new user to the user_storage
function addUserToStorage(user){
    //so such user in the storage, can add
    if (JSON.parse(sessionStorage.getItem(user.username)) == undefined){
        sessionStorage.setItem(user.username, JSON.stringify(user));
        return true;
    }else{ //already exist
        return false; 
    }
}

//find the logined user in the existing users
function userManagerLogin(){
    //get values from the login fields
    let passwordL = $('#psw_log').val();
    let usernameL = $('#uname_log').val();

    transferToLogin(usernameL, passwordL);
}

//check if the user exists
function validateUserExists(usernameL, passwordL){
    var userStored = JSON.parse(sessionStorage.getItem(usernameL));
    //if no such user was found
    if (userStored == null){
        return false;
    }else{  //compare their passwords
        let pass = userStored.password;
        return pass == passwordL;
    }
}




    


