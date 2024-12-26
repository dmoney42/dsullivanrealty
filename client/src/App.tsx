import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';


function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          {/*
          <Route path='/about' element={<Home/>}/>
          <Route path='/properties' element={<Home/>}/>
          <Route path='/contact' element={<Home/>}/>
          */}
        </Routes>
     </BrowserRouter>
   
    </>
  )
}

export default App
