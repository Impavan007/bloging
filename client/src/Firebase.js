// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCl2FgUS8TFkrhm-1sXE80OGbTdEk-9ms",
  authDomain: "bloging-ee1f3.firebaseapp.com",
  projectId: "bloging-ee1f3",
  storageBucket: "bloging-ee1f3.appspot.com",
  messagingSenderId: "702445229465",
  appId: "1:702445229465:web:3523e1137a9a6668aaef08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider = new GoogleAuthProvider();

export default app