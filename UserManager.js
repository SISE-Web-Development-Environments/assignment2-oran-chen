//Define the user class

class User{
    //define the variables of the user
    username;
    password;
    fullname;
    email;
    birthdate;

    //initialize the parameters from the dictionary received
    constructor( parameters={} ){
        this.username = parameters.username;
        this.password = parameters.password;
        this.fullname = parameters.fullname;
        this.email = parameters.email;
        this.birthdate = parameters.birthdate;
    }
}

//add a new user to the user_storage
function addUserToStorage(user){
    //so such user in the storage, can add
    if (sessionStorage.getItem(user.username) == undefined){
        sessionStorage.setItem(user.username, user);
        return true;
    }else{ //already exist
        return false;
    }
}

//find the logined user in the existing users
function userManagerLogin(){
    //get values from the login fields
    var passwordL = $('#psw_log').val();
    var usernameL = $('#uname_log').val();

    //if a user with such user name and password does not exist
    if(!validateUserExists(usernameL, passwordL)){
        alert("The user doesn't exist in the system, please enter the details again");
    }else{ //does exist, connect him
        session_user = JSON.parse(sessionStorage.getItem(usernameL));
        document.getElementById('front_display').innerHTML = "The user " + session_user.fullname + " is currently logged in.";
        replaceWindow(event, 'game');

    }
}

//check if the user exists
function validateUserExists(usernameL, passwordL){
    var userStored = JSON.parse(sessionStorage.getItem(usernameL));
    //if no such user was found
    if (userStored == null){
        return false;
    }else{  //compare their passwords
        var pass = userStored.password;
        return pass == passwordL;
    }
}



    


