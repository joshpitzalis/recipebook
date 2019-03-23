import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCMKTHb90V6HT_ztVJe3ijRCTk0JA9gm9k',
  authDomain: 'localf-6ed09.firebaseapp.com',
  databaseURL: 'https://localf-6ed09.firebaseio.com',
  projectId: 'localf-6ed09',
  storageBucket: 'localf-6ed09.appspot.com',
  messagingSenderId: '925256549740',
};

let firebaseInstance;

export default function initFirebase(initialState, history) {
  if (firebaseInstance) {
    return firebaseInstance;
  }
  // Handle initializeing firebase app if not already on window (when running tests)
  if (window.fbInstance) {
    firebaseInstance = window.fbInstance;
  }
  // Init Firebase if an instance doesn't already exist
  if (!firebaseInstance) {
    firebase.initializeApp(config);
    firebaseInstance = firebase;
  }
  // Return Firebase instance
  return initFirebase;
}

initFirebase();

export const db = firebase.firestore();
