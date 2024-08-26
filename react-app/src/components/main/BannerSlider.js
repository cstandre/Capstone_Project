import React from "react";
import Slider from "react-slick";

import "./BannerSlider.css"

import "../../../node_modules/slick-carousel/slick/slick.css"


const BannerSlider = () => {
    const imgSettings = {
        initalSlide: 0,
        dots: false,
        speed: 1500,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        autoplay: true,
    };

    const images = {
        1: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_1.jpg",
        2: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_5.jpg",
        3: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_3.jpg"
    }

    return(
        <div className="slider-container">
            <Slider {...imgSettings}>
            {Object.entries(images).map(([key, image]) => (
                <div className="slider-img-container" key={key}>
                <img className={`slider-img ${key}`} src={image} alt={`slide-${key}`} />
                </div>
            ))}
            </Slider>
        </div>
    );

};

export default BannerSlider;
