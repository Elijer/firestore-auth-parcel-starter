import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebaseConfig } from "./helpers/firebaseConfig";
import { handleEmulators } from "./helpers/handleEmulators";
import { firestoreTest } from "./helpers/firestoreTest";
import { auth } from "./helpers/auth";


document.addEventListener("DOMContentLoaded", event => {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    handleEmulators(db);
    firestoreTest(db);
    auth(firebase);

});