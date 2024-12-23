import React from 'react'
import { useState, useEffect } from 'react';
import NavBar from '../components/Nav/NavBar';
import "../App.css";

const SignUp = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value})
        console.log("The contents of the form is: " + JSON.stringify(formData));
    }

    const handleSubmit = async (e) =>{
        e.perventDefault();
        const response = await fetch("http://localhost:3000/api/auth/signup",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        console.log("The info from the form submitted is: " + JSON.stringify(formdata));
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
                    Sign Up
                </button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Have an account</p>
                <span className='text-blue-500'>Sign In</span>
            </div>

        </div>
    </>
  )
}

export default SignUp