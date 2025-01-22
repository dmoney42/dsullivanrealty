import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import app from "../firebase.js";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
      console.log("You are inside the handleGoogleClick function");
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth,provider);
        const response = await fetch("http://localhost:3000/api/auth/google",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL

            }),
        });

        const data = await response.json();
        dispatch(signInSuccess(data));
        navigate("/");

        console.log(result);
      } catch (error) {
        console.log('Could not sign in with Google: ', error);
      }
  };


  return (
    <>
      <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
        Sign In With Google
      </button>  
    </>

  )
}

export default OAuth