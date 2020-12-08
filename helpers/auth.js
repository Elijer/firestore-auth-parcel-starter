export function auth(firebase){

  // RELEVANT DOM ELEMENTS
  var login = document.getElementById("login");
  var logout = document.getElementById("logout");
  var loader = document.getElementById("loader")

  // SET USER PERSISTENCE SETTING
    // LOCAL:   Auth state persists on client IP unless signout out.
    // SESSION: Auth state ends when tab or window is closed.
    // NONE:    Not saved in browser. Cleared when page is refreshed.
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  // LISTEN FOR CHANGES IN AUTH (login, logout, etc)
  firebase.auth().onAuthStateChanged(function(user) {
    disp("loading");
    if (user) {
      //console.log(user.uid);
      disp("in", user);
    } else {
      login.innerHTML = "login";
      disp("out");
    }
  });

  // LOGIN
  login.addEventListener('click', function(){
    anonLogin(firebase);
  });

  // LOGOUT
  logout.addEventListener('click', function(){
    signOut(firebase);
  });

  // DISPLAY
  var disp = function(i, user){
    switch(i){
      case "loading":
        loader.style.display = "block";
        login.style.display = "none";
        logout.style.display = "none";
        break;

      case "in":
        loader.style.display = "none";
        login.style.display = "inline";
        logout.style.display = "inline";
        login.innerHTML = `Logged in as ${user.uid}`;
        break;

      case "out":
        loader.style.display = "none";
        login.style.display = "inline";
        logout.style.display = "none";
        break;
    }
  }

}

// LOG IN AS ANONYMOUS USER WITH FIREBASE AUTH
function anonLogin(firebase){

  firebase.auth().signInAnonymously()
  .then(result => {
    const user = result.user;
    console.log(user + "signed in");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
  
}

// LOG OUT WITH FIREBASE AUTH
function signOut(firebase){

  firebase.auth().signOut()
  .then(result => {
    console.log("signed out");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  })
  
}