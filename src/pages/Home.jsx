import React, { useEffect, useState } from "react";
import NavBar from "../components/Nav/NavBar";
import HeroSection from "../components/HeroSection";
import "../App.css";
import house1 from "../assets/house1.jpg";
import images from "../assets/images.json";

const Home = () => {
  const pathToImagesFolderFromHere = "../src/assets/";
  const firstImage = images[0];

  //these variables are for the image Carousel seen on the homepage
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(()=>{
    console.log("the useEffect ran");

    
    const intervalId = setInterval(()=>{
        
        console.log("The value of currentImageIndex is: " + currentImageIndex);
        
        setCurrentImageIndex((prevIndex)=>{
            console.log("We incremented prevIndex to " + prevIndex);
            return (prevIndex + 1) % images.length;
          
        }); 
        
        
    },5000); 
    
    return () => clearInterval(intervalId);
    

  },[images.length]);

  return (
    <>
      <NavBar />
      <HeroSection />

      <div className="titleHeaderSection">
        <h2>Our Most Exclusive</h2>
        <p>Choose your future destiny</p>
      </div>

      <div className="homepagePropertyGrid">
        {
          images.map((image, index) => {
            return (
              <div className="homepageGridItem" key={index}>
                <div className="gridProperyImage">
                  <a href="">
                    <img
                
                src={`${pathToImagesFolderFromHere}${image.src}`}
                      alt={`${image.alt}`}
                    />
                  </a>
                </div>
                <div className="gridPropertyDetails">
                  <h2>Property Descriptive Title</h2>

                  <p className="itemPrice">$3750/mth</p>

                  <p className="gridPropertyType">HOUSE</p>
                  <img
                
                src="../src/assets/beds-bathrooms-sqfootage-icon.jpg"
                    alt=""
                  />
                </div>
              </div>
            );
          }) //end of map
        }



        {/*The code below if for if we dont want to dynamically generate the 
            grid, property images prices etc... using map function and the object array called
            images */}
        {/*
            
            <div className="homepageGridItem">
                <div className="gridProperyImage">
                    <a href=""><img src={`${pathToIm
                    agesFolderFromHere}${firstImage.src}`} alt="something" /></a>
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
                    <a href="../"><img src="" alt="" />
                    </a>
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
                    <a href="../"><img src="" alt="" />
                    </a>
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
                    <a href="../"><img src="" alt="" />
                    </a>
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
                    <a href="../"><img src="" alt="" />
                    </a>
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
                    <a href="../"><img src="" alt="" />
                    </a>
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


      </div>{/*end of homepagePropertyGrid */}



            <div className="imageCarousel">
                <img src={`${pathToImagesFolderFromHere}${images[currentImageIndex].src}`} alt=""/>
                <div className="carouselOverlay">
                    <h2>Our Most Elegant Properties</h2>
                    <p>Learn more about our finest properties what we can offer you and your family</p>
                    <button>Explore</button>
                </div>
            </div>

            <div className="titleHeaderSection">
                <h2>Explore The Neightborhood</h2>
                <p>Your New City Awaits</p>
            </div>

            <div className="citiesSection">

                <div className="citiesSectionColumn">

                    <div className="citySectionItem1">
                        <p>City image</p>
                    </div>

                    <div className="citySectionItem2">
                    <img src="../src/assets/house1.jpg" alt="" />
                    </div>

                </div>


                <div className="citiesSectionColumn">

                    <div className="citySectionItem2">
                        <p>City Image 1</p>
                    </div>

                    <div className="citySectionItem1">
                        <p>City Image 2</p>
                    </div>

                </div>


                <div className="citiesSectionColumn">
                    
                    <div className="citySectionItem1">
                        <p>City Image 1</p>
                    </div>

                    
                    <div className="citySectionItem1">
                        <p>City Image 2</p>
                    </div>

                    
                    <div className="citySectionItem1">
                        <p>City Image 3</p>
                    </div>

                </div>


            </div>

 



    </>
  );
};

export default Home;
