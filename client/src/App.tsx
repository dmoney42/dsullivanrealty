import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp.jsx'


function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
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
