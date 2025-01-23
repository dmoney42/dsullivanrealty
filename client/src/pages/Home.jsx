import React, { useEffect, useState } from "react";
import NavBar from "../components/Nav/NavBar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer/Footer";
import "../App.css";
import house1 from "../assets/house1.jpg";
import images from "../assets/images.json";

const Home = () => {
  const pathToImagesFolderFromHere = "../src/assets/";
  const firstImage = images[0];

  //these variables are for the image Carousel seen on the homepage
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(()=>{
    //console.log("the useEffect ran");

    
    const intervalId = setInterval(()=>{
        
        //console.log("The value of currentImageIndex is: " + currentImageIndex);
        
        setCurrentImageIndex((prevIndex)=>{
            //console.log("We incremented prevIndex to " + prevIndex);
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
                <h2>Our Most Exclusive Homes</h2>
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
            </div>



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
                        <img src="../src/assets/los-angeles-city-image.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>Los Angelos</p>
                                    <p>20 Listings</p>                                 
                            </div>
                        </div>
                    </div>

                    <div className="citySectionItem2">
                        <img src="../src/assets/interior-couch-long-rectangle1.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>Orlando</p>
                                    <p>25 Listings</p>                                 
                            </div>
                        </div>                     
                    </div>

                </div>


                <div className="citiesSectionColumn">

                    <div className="citySectionItem2">
                        <img src="../src/assets/interior-couch-long-rectangle2.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>Maryland</p>
                                    <p>18 Listings</p>                                 
                            </div>
                        </div>                       
                    </div>

                    <div className="citySectionItem1">
                        <img src="../src/assets/miami-city-image.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>Miami</p>
                                    <p>32 Listings</p>                                 
                            </div>
                        </div>                  
                    </div>

                </div>


                <div className="citiesSectionColumn">
                    
                    <div className="citySectionItem1">
                        <img src="../src/assets/new-york-cities-image.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>New York</p>
                                    <p>5 Listings</p>                                 
                            </div>
                        </div>                      
                    </div>

                    
                    <div className="citySectionItem1">
                        <img src="../src/assets/sanfrancisco-city-image.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>San Francisco</p>
                                    <p>12 Listings</p>                                 
                            </div>
                        </div>                        
                    </div>

                    
                    <div className="citySectionItem1">
                        <img src="../src/assets/venice-beach-city-image.jpg" alt="" />
                        <div className="seeThroughBox"> 
                            <div className="citySectionItemTextWrap">
                                    <p>Venice Beach</p>
                                    <p>9 Listings</p>                                 
                            </div>
                        </div>                        
                    </div>

                </div>

            </div>

            <Footer/>
            
            



    </>
  );
};

export default Home;
