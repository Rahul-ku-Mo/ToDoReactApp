// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEmK7x83oX1zcz0D5Ua7w9EsacoT_oOoY",
  authDomain: "todoapp-60c8d.firebaseapp.com",
  projectId: "todoapp-60c8d",
  storageBucket: "todoapp-60c8d.appspot.com",
  messagingSenderId: "329438305298",
  appId: "1:329438305298:web:d93c8c21c59b0e095a8ccb",
  measurementId: "G-ENQWRQ8NGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
