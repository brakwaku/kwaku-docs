// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbcCD5qjHoKOIefuYrwt17U_bmVzkQLTc",
  authDomain: "kwaku-docs.firebaseapp.com",
  projectId: "kwaku-docs",
  storageBucket: "kwaku-docs.appspot.com",
  messagingSenderId: "1073324475460",
  appId: "1:1073324475460:web:9458b7a51634a06d756811",
  measurementId: "G-BDEB93XV4K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const analytics = getAnalytics(app);