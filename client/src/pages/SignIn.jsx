import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from '../components/Nav/NavBar';
import "../App.css";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const backendURL = import.meta.env.VITE_BACKEND_URL;



const SignIn = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state)=> state.user);
    //const[error, setError] = useState(null);
   // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

   
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value})
        console.log("The contents of the form is: " + JSON.stringify(formData));
    }

    /* ****************************************************************************** */

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("The form was submitted");

        
      
        try {
            //setLoading(true);
            dispatch(signInStart());
            const response = await fetch(`${backendURL}/api/auth/signin`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
      
      
          const data = await response.json();

          console.log("Document cookies after login:", document.cookie); // Debug cookies


          if (data.success == false) {
            //setLoading(false);
            dispatch(signInFailure(data.user));
            //setError(data.message);
            return;
          }

           // Check if cookie was set (this is the key part)
          if (document.cookie.includes('access_token_cookie')) {
            console.log('Cookie "access_token_cookie" was successfully created!');
            // Redirect or other actions
          } else {
              console.error('Cookie "access_token_cookie" was NOT set!');
          }  
          
          dispatch(signInSuccess(data));

          //in either cases set the loading the false
         // setLoading(false);
         // setError(null); //if signup is successfull set error to null

          navigate("/");

          console.log("Signin success:", data);


        } catch (error) {
          dispatch(signInFailure(data.user));
            //setLoading(false);
          // This is the CRUCIAL part - handle the error here!
            //setError(error.message);
        }
        
    }

  return (
    <>
        <NavBar />
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                    {loading ? "Loading..." : "Sign In"}
                </button>
                  <OAuth />
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Dont have an account?</p>
                <Link to={"/sign-up"}>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 m">{error}</p>}
        </div>
    </>
  )
}

export default SignIn