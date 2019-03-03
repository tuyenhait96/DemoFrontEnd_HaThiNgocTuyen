import * as firebase from 'firebase'
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbggczvL0K9Er0XphAhzoaOpUCGHyOhso",
    authDomain: "notereact-e0c13.firebaseapp.com",
    databaseURL: "https://notereact-e0c13.firebaseio.com",
    projectId: "notereact-e0c13",
    storageBucket: "notereact-e0c13.appspot.com",
    messagingSenderId: "841072217187"
  };
  firebase.initializeApp(config);
  export const noteData = firebase.database().ref('dataForNote/')