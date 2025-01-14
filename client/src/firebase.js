// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log("The environmental variable shown by vite are: " + JSON.stringify(import.meta.env.VITE_FIREBASE_API_KEY));

const firebaseConfig = {
  apiKey: "AIzaSyDn8XjbuqWxGgx8O47YeyMuVLRAUMiEBHc",
  authDomain: "dsullivanrealty-bd9e8.firebaseapp.com",
  projectId: "dsullivanrealty-bd9e8",
  storageBucket: "dsullivanrealty-bd9e8.firebasestorage.app",
  messagingSenderId: "1006463634462",
  appId: "1:1006463634462:web:eac86420b369ae0312f20f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app