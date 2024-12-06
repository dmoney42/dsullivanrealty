import React, { useEffect, useState } from 'react'
import NavBar from '../components/Nav/NavBar'
import HeroSection from '../components/HeroSection'
import '../App.css'
import house1 from '../assets/house1.jpg'
import images from '../assets/images.json'



const Home = () => {

    const pathToImagesFolderFromHere = '../src/assets/';
    const firstImage = images[0];

  return (
    <>
         <NavBar/>
         <HeroSection/>

         <div className="homepageGridHeader">
            <h2>Our Most Exclusive</h2>
            <p>Choose your future destiny</p>

        </div>
        
        <div className="homepagePropertyGrid">

            {
                images.map((image,index)=>{

                    return (
                    <div className="homepageGridItem" key={index}>
                       
                        <div className="gridProperyImage">
                            <a href=""><img src={`${pathToImagesFolderFromHere}${image.src}`} alt={`${image.alt}`}/></a>
                        </div>
                        <div className="gridPropertyDetails">

                            <h2>Property Descriptive Title</h2>

                            <p className="itemPrice">
                                $3750/mth
                            </p>

                            <p className="gridPropertyType">
                                HOUSE
                            </p>
                            <img src="../src/assets/beds-bathrooms-sqfootage-icon.jpg" alt="" />
                        </div>

                    </div>  
                    )

                }) //end of map 
          
            }

            {/*The code below if for if we dont want to dynamically generate the 
            grid, property images prices etc... using map function and the object array called
            images */}
            {/*
            
            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href=""><img src={`${pathToImagesFolderFromHere}${firstImage.src}`} alt="something" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div>


            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href="../"><img src="" alt="" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div>



            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href="../"><img src="" alt="" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div>



            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href="../"><img src="" alt="" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div>



            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href="../"><img src="" alt="" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div>



            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href="../"><img src="" alt="" /></a>
                </div>
                <div className="gridPropertyDetails">

                    <h2>Property Descriptive Title</h2>

                    <div className="itemPrice">
                        $3750/mth
                    </div>

                    <div className="gridPropertyType">
                        HOUSE
                    </div>
                </div>

            </div> 

            */}
        
        </div>


        
    </>
    
  )
}

export default Home