import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from '../components/Nav/NavBar';
import "../App.css";

const SignUp = () => {


    const[error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value})
        console.log("The contents of the form is: " + JSON.stringify(formData));
    }

    /* ****************************************************************************** */

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("The form was submitted");

        
      
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
      
      
          const data = await response.json();

          if (data.success == false) {
            setLoading(false);
            setError(data.message);
            return;
          }

          //in either cases set the loading the false
          setLoading(false);
          setError(null); //if signup is successfull set error to null
          navigate("/sign-in");

          console.log("Signup success:", data);


        } catch (error) {
            setLoading(false);
          // This is the CRUCIAL part - handle the error here!
            setError(error.message);
        }
        
    }

  return (
    <>
        <NavBar />
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" onChange={handleChange}/>
                <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className='text-blue-500'>Sign In</span>
                </Link>
            </div>
            {error && <p className="text-red-500 m">{error}</p>}
        </div>
    </>
  )
}

export default SignUp