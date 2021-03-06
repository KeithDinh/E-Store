import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVEt1tCUL2hJ5TzEDxmqlNT2JIMH0CQ-s",
  authDomain: "mern-electronics-store.firebaseapp.com",
  projectId: "mern-electronics-store",
  storageBucket: "mern-electronics-store.appspot.com",
  messagingSenderId: "281526497194",
  appId: "1:281526497194:web:677e82d4754b5be75205d3",
  measurementId: "G-0Q4ZKZDHEL",
};
const fb = firebase;
// initialize firebase
fb.initializeApp(firebaseConfig);

// export
export const auth = fb.auth();
export const googleAuthProvider = new fb.auth.GoogleAuthProvider();
