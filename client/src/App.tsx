import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.js';


function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
          </Route>
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
