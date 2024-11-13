// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsj6HhzLwFdVyH1siNuH7XL2BOgu0L3Mo',
  authDomain: 'tts-app-76269.firebaseapp.com',
  projectId: 'tts-app-76269',
  storageBucket: 'tts-app-76269.appspot.com',
  messagingSenderId: '605195117831',
  appId: '1:605195117831:web:b2dbbe26c1e5d0dfb051a2',
  measurementId: 'G-54HEJSGBYV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
