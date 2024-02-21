// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwyg-azDFmeD2XYMgx0doHZ3cH-QOfK1M",
  authDomain: "netz-c4d73.firebaseapp.com",
  projectId: "netz-c4d73",
  storageBucket: "netz-c4d73.appspot.com",
  messagingSenderId: "318610808105",
  appId: "1:318610808105:web:931ca0e05299113e5d2b38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStoreDb = getFirestore(app);


