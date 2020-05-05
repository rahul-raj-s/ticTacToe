import firebase from "firebase/app";
import "firebase/firebase-firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCT7xyDFbQUQ_ozYKxx6SYNe09AgpNUqI0",
  authDomain: "tic-tac-toe-dfbb3.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-dfbb3.firebaseio.com",
  projectId: "tic-tac-toe-dfbb3",
  storageBucket: "tic-tac-toe-dfbb3.appspot.com",
  messagingSenderId: "44261683513",
  appId: "1:44261683513:web:febe3320b34595052f38e8",
  measurementId: "G-RF7L67RN49",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export { firebaseConfig };
