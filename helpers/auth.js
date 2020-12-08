export function auth(firebase){

  var login = document.getElementById("login");
  var logout = document.getElementById("logout");
  var loader = document.getElementById("loader")

  firebase.auth().onAuthStateChanged(function(user) {
    disp("loading");
    if (user) {
      console.log(user.uid);
      login.innerHTML = `Logged in as ${user.uid}`;
      disp("in");
    } else {
      login.innerHTML = "login";
      disp("out");
    }
  });

  // LOGIN
  login.addEventListener('click', function(){
    anon(firebase);
  });

  // LOGOUT
  logout.addEventListener('click', function(){
    firebase.auth().signOut();
  });

  var disp = function(i){
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
        break;

      case "out":
        loader.style.display = "none";
        login.style.display = "inline";
        logout.style.display = "none";
        break;
    }
  }

}


function anon(firebase){

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