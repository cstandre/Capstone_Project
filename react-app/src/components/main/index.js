import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

import "./main.css"


const MainPage = () => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);

  useEffect(() => {
    const calculateSliderSize = () => {
      const parentContainerWidth = document.querySelector('.body').clientWidth;
      const calculatedWidth = Math.round(parentContainerWidth * 0.8);
      setSliderWidth(calculatedWidth);

      const calculatedHeight = Math.round(calculatedWidth * 0.3);
      setSliderHeight(calculatedHeight);
    };

    calculateSliderSize();
    window.addEventListener('resize', calculateSliderSize);

    return () => {
      window.removeEventListener('resize', calculateSliderSize);
    };
  }, []);

  const images = [
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_1.jpg"
    },
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_2.jpg"
    },
    {
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_3.jpg"
    }
  ];

  return (
    <div className="body">
      <div className="img-ad-container">
        <div className="slider">
          <SimpleImageSlider
            width={sliderWidth}
            height={sliderHeight}
            images={images}
            showNavs={true}
          />
        </div>
        <div className="ad-container">
          <div className="ad-box container-1">
              <h1>container 1</h1>
          </div>
          <div className="ad-box container-2">
            <h1>container 2</h1>
          </div>
          <div className="ad-box container-3">
            <h1>container 3</h1>
          </div>
          <div className="ad-box container-4">
            <h1>container 4</h1>
          </div>
          <div className="ad-box container-5">
            <h1>container 5</h1>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MainPage;
