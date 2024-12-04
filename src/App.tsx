import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import NavBar from './components/Nav/NavBar'
import HeroSection from './components/HeroSection'
import Home from './pages/Home.jsx'

function App() {
  

  return (
    <>
      <NavBar/>
      <HeroSection/>
      <div>
        <p>This is the start of our program</p>
      </div>

   
    </>
  )
}

export default App
