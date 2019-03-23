

//top of the file
import firebase from 'firebase/app'
require('firebase/firestore')

const config = {
    apiKey: "AIzaSyCMKTHb90V6HT_ztVJe3ijRCTk0JA9gm9k",
    authDomain: "localf-6ed09.firebaseapp.com",
    databaseURL: "https://localf-6ed09.firebaseio.com",
    projectId: "localf-6ed09",
    storageBucket: "localf-6ed09.appspot.com",
    messagingSenderId: "925256549740"
};

firebase.initializeApp(config)

//bottom of the file
export const db = firebase.firestore()