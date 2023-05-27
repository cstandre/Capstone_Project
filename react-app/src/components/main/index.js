import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";

import "./main.css"


const MainPage = () => {
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
      <div className="slider">
        <SimpleImageSlider
          width={1400}
          height={700}
          images={images}
          showNavs={true}
        />
      </div>
    </div>
  )
};

export default MainPage;
