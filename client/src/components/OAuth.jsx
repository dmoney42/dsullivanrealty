import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import app from "../firebase.js";

const OAuth = () => {


  const handleGoogleClick = async () => {
      console.log("You are inside the handleGoogleClick function");
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth,provider);
        console.log(result);
      } catch (error) {
        console.log('Could not sign in with Google: ', error);
      }
  };


  return (
    <>
      <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
        OAuth
      </button>  
    </>

  )
}

export default OAuth