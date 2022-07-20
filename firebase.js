// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtHqOCuQTbJusskUuAJHnLbbaczNRYQiA",
  authDomain: "chitter-full.firebaseapp.com",
  projectId: "chitter-full",
  storageBucket: "chitter-full.appspot.com",
  messagingSenderId: "549823495702",
  appId: "1:549823495702:web:f71d087fa116090777bf37",
  measurementId: "G-X3Q51JWTVF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };