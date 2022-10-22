import firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCpQchmyyRWDXEhtHSKbJrejNz4JaPXE8",
    authDomain: "nicavac-bd-869d0.firebaseapp.com",
    databaseURL: "https://nicavac-bd-869d0-default-rtdb.firebaseio.com",
    projectId: "nicavac-bd-869d0",
    storageBucket: "nicavac-bd-869d0.appspot.com",
    messagingSenderId: "438416589394",
    appId: "1:438416589394:web:8d644ae7ca978bf7d3d58b",
    measurementId: "G-NMBFZ4EYM6",
  };

  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const authentication = firebase.auth();

  export default { firebase, db, authentication };