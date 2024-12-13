import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
function App() {
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
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
