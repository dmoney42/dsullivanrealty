import React from 'react';
import styles from '../components/Nav/Nav.module.css'
import HeroImage from '../assets/house-hero-image.jpg'
import HeroImage2 from '../assets/hero-image-2.jpg'
import '../App.css';

const HeroSection = () => {
  return (
    <>

    <section className="hero">
      <img src={HeroImage2} alt="house hero image" />
    </section>

    <div className="homepageGridHeader">
      <h2>Our Most Exclusive</h2>
      <p>Choose your future destiny</p>

    </div>


    </>
  )
}

export default HeroSection