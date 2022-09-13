import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

console.log(process.env);
firebase.initializeApp({
  apiKey: "AIzaSyAT9MJYNxq7IQOetX8y4WNHZaz1JVmrWHU",
  authDomain: "clicker-b55d5.firebaseapp.com",
  projectId: "clicker-b55d5",
  storageBucket: "clicker-b55d5.appspot.com",
  messagingSenderId: "873961917530",
  appId: "873961917530:web:fec18a40191af228a8dc63",
  measurementId: "G-CWNQK4VVB6",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
