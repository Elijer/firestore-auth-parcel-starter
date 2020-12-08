import { rword } from 'rword';

export function auth(firebase, db){

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
      disp("out");
    }
  });

  // LOGIN
  login.addEventListener('click', function(){
    anonLogin(firebase, db);
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
        logout.style.display = "inline";
        login.style.display = "inline";
        login.classList.add("login-inviz");
        setTimeout(() => {
          login.innerHTML = `Logged in as ${user.uid}`;
          login.classList.remove("login-inviz");
        }, 220);
        
        break;

      case "out":
        login.classList.add("login-inviz");
        setTimeout(() => {
          login.classList.remove("login-inviz");
          login.innerHTML = "login";
        }, 220);
        loader.style.display = "none";
        login.style.display = "inline";
        logout.style.display = "none";
        break;
    }
  }

}

// LOG IN AS ANONYMOUS USER WITH FIREBASE AUTH
function anonLogin(firebase, db){

  firebase.auth().signInAnonymously()
  .then(result => {
    const user = result.user;
    name(user.uid, db)
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

function name(uid, db){
  var w = rword.generate(3, { length: 4 });
  var name = w[0] + " " + w[1] + " " + w[2];

  const userRef = db.collection("users").doc(uid);

  userRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
      userRef.set({
        uid: uid,
        name: name
    })
      .then(() => {
          console.log("Document successfully written!");
        })
      .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });



}