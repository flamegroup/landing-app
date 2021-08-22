import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyC1clqA2-6FuPMRYMRgqMJxQwH0hgURJLM',
  authDomain: 'flame-group-page.firebaseapp.com',
  projectId: 'flame-group-page',
  storageBucket: 'flame-group-page.appspot.com',
  messagingSenderId: '102954010397',
  appId: '1:102954010397:web:9215e4df1ca0ecf63483f4',
  measurementId: 'G-HP992ZMWVS',
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
export const fire = firebase;
