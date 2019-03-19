// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
const fbConfig = {
  apiKey: 'AIzaSyCMKTHb90V6HT_ztVJe3ijRCTk0JA9gm9k',
  authDomain: 'localf-6ed09.firebaseapp.com',
  databaseURL: 'https://localf-6ed09.firebaseio.com',
  projectId: 'localf-6ed09',
  storageBucket: 'localf-6ed09.appspot.com',
  messagingSenderId: '925256549740'
};
window.fbInstance = firebase.initializeApp(fbConfig);
// add cy.login, cy.logout, cy.callRtdb, and cy.callFirestore
attachCustomCommands({ Cypress, cy, firebase });
