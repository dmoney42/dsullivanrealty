import React from 'react'

const OAuth = () => {


  const handleGoogleClick = () => {
      console.log("You are inside the handleGoogleClick function");
      try {
        
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