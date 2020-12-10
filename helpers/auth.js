import whimsy from 'whimsy';

export function auth(firebase, db){

  // RELEVANT DOM ELEMENTS
  var login = document.getElementById("login");
  var loginState = document.getElementById("login-state");
  var username = document.getElementById("username");

  var logout = document.getElementById("logout");
  var loader = document.getElementById("loader")

  // CHANGE USERNAME
  username.addEventListener('keydown', contentEdited);
  username.addEventListener('focus', changeUsername, true);

  // SET USER PERSISTENCE SETTING
    // LOCAL:   Auth state persists on client IP unless signout out.
    // SESSION: Auth state ends when tab or window is closed.
    // NONE:    Not saved in browser. Cleared when page is refreshed.
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  // LISTEN FOR CHANGES IN AUTH (login, logout, etc)
  firebase.auth().onAuthStateChanged(function(user) {
    disp("loading");
    if (user) {

      const userRef = db.collection("users").doc(user.uid);

      userRef.get().then(function(doc) {
        let name = doc.data().name;
        disp("in", name);
      })

    } else {
      disp("out");
    }
  });

  // LOGIN
  loginState.addEventListener('click', function(){
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
          loginState.innerHTML = 'logged in as '
          username.innerHTML = user;
          loginState.classList.remove("login-go");
          //login.innerHTML = `logged in as ${user}`;
          login.classList.remove("login-inviz");
        }, 220);
        
        break;

      case "out":
        login.classList.add("login-inviz");
        setTimeout(() => {
          login.classList.remove("login-inviz");
          loginState.innerHTML = "login";
          username.innerHTML = "";
          loginState.classList.add("login-go");
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
  let name =  whimsy('{{adjective}}_{{noun}}');

  const userRef = db.collection("users").doc(uid);
  userRef.set({
    uid: uid,
    name: name
  })
}


function contentEdited(e){

  let original = username.innerHTML;
  let leng = original.length;
  let charLimit = 20;


  if (leng > charLimit && e.keyCode != 8){
    event.preventDefault();
  }

/*   let original = username.innerHTML;
  let leng = original.length;
  let charLimit = 20;
  if (leng > 20){
    alert("Sorry! Your Username can't be that long");
    username.innerHTML = username.innerHTML.substring(0, original.length-2);
  }
  console.log(original.length); */

}


function changeUsername(){

  let original = username.innerHTML;

  username.addEventListener('blur', (event) => {

    let newOne = username.innerHTML;

    if (newOne.length < 3){
      alert("Username has to be at least 3 characters");
      username.innerHTML = original;
    }

    console.log(username.innerHTML);

  })
}