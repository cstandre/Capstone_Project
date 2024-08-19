import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadProducts } from "../../store/products";
import { addItem } from "../../store/cart";
import LoginMessage from "../ ErrorModals/loginModal"
import Flickity from 'react-flickity-component';
import OpenModalButton from "../OpenModalButton";

import "./main.css";
import "flickity/css/flickity.css";

const flickityOptions = {
  initialIndex: 0,
  autoPlay: 3000, // Add a delay for better transitions
  wrapAround: true,
  pageDots: false,
  prevNextButtons: true,
  draggable: true, // Ensure this is set to true
  freeScroll: false // Prevents scrolling beyond the last slide
};


const MainPage = () => {
  const history = useHistory();
  const products = useSelector((state) => state?.products);
  const sessionUser = useSelector((state) => state?.session.user);
  const dispatch = useDispatch();
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   const calculateSliderSize = () => {
  //     const parentContainerWidth = document.querySelector('.body').clientWidth;
  //     const calculatedWidth = Math.round(parentContainerWidth * 0.8);
  //     setSliderWidth(calculatedWidth);
  //     setSliderHeight(Math.round(calculatedWidth * 0.3));
  //   };

  //   calculateSliderSize();
  //   window.addEventListener('resize', calculateSliderSize);
  //   return () => window.removeEventListener('resize', calculateSliderSize);
  // }, []);

  useEffect(() => {
    const productsArr = Object.values(products)?.flatMap(product => Object.values(product));
    const randomProducts = productsArr?.sort(() => Math.random() - Math.random()).slice(0, 5);
    setRandomProducts(randomProducts);
  }, [products]);

  const images = [
    {
      id: 1,
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_1.jpg"
    },
    {
      id: 2,
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_5.jpg"
    },
    {
      id: 3,
      url: "https://caitlyn.s3.us-west-2.amazonaws.com/amazon_banner_3.jpg"
    }
  ];

  const handleCartButton = (id) => {
    dispatch(addItem(id, 1));
  };

  const handleProductDetail = (productId) => {
    history.push(`/products/${productId}`);
  };

  return (
    <div className="body">
      <Flickity
        className={"carousel"}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
      >
        {images.map((image) => (
          <img
            className="carousel-img"
            key={image.id}
            src={image.url}
            alt={`Slide ${image.id}`}
          />
        ))}
      </Flickity>
      <div className="product-display-container">
        {randomProducts.map((product, idx) => (
          <div className={`product-box container-${idx}`} key={product.id}>
            <img
              className={`product-box-img-${idx}`}
              alt={product.product_name}
              src={product?.preview_image}
              onClick={() => handleProductDetail(product?.id)}
            />
            <div className="product-details-main">
              <p
                className="product-name-main"
                onClick={() => handleProductDetail(product?.id)}
              >
                {product.product_name}
              </p>
              {product?.stock_quantity > 0 ? (
                <p className="in-stock">In Stock</p>
              ) : (
                <p className="no-stock">Out of Stock</p>
              )}
            </div>
            {sessionUser ? (
              <button
                onClick={() => handleCartButton(product?.id)}
                className="add-to-cart"
              >
                Add to cart
              </button>
            ) : (
              <OpenModalButton
                className="add-to-cart"
                buttonText={"Add to cart"}
                modalComponent={<LoginMessage />}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
