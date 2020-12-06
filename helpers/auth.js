export function auth(firebase){

  var login = document.getElementById("login");
  var loader = document.getElementById("loader")

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      login.innerHTML = `Logged in as ${user.uid}`;
      loader.style.display = "none";

    } else {
      login.innerHTML = "login";
      loader.style.display = "none";
    }
  });

    //onChange(fb);
  
    // CLICK LISTENER FOR LOGIN BUTTON
/*     document.getElementById('login').addEventListener('click', function(){
      console.log("log in stuff");
      anon(fb);
    }); */

}


function onChange(firebase){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(uid);
      // ...
    } else {
      console.log("User is signed out");
      // User is signed out
      // ...
    }
  });
}


function anon(firebase){

  console.log(firebase.auth().getCurrentUser());

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