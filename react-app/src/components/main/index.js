import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Carousel from '@itseasy21/react-elastic-carousel';
import { loadProducts } from "../../store/products";
import { addItem } from "../../store/cart";
import LoginMessage from "../ ErrorModals/loginModal";

import "./main.css"
import OpenModalButton from "../OpenModalButton";

const MainPage = () => {
  const history = useHistory();
  const products = useSelector(state=>state?.products);
  const sessionUser = useSelector(state=>state?.session.user);
  const dispatch = useDispatch();
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

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

  useEffect(() => {
    const productsArr = Object?.values(products)?.flatMap(product => Object?.values(product));
    const randomProducts = productsArr?.sort(() => Math.random() - Math.random()).slice(0, 5);
    setRandomProducts(randomProducts);
    // console.log(randomProducts)
  }, [products])

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
    // console.log(productId)
    history.push(`/products/${productId}`);
  };

  return (
    <div className="body">
      <div>
        {/* <div className="slider">
          <Carousel
            itemsToShow={1}
            itemsToScroll={1}
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            transitionMs={1000}
          >
            {images.map(image => (
              <div key={image.id}><img src={image.url} alt={`Banner ${image.id}`} /></div>
            ))}
          </Carousel>
        </div> */}
        <div className="product-display-container">
          {randomProducts?.map((product, idx) => (
            <div className={`product-box container-${idx}`} key={idx}>
              <img
                className={`product-box-img-${idx}`}
                alt=""
                src={product?.preview_image}
                value={product?.id}
                onClick={() => handleProductDetail(product?.id)}
              ></img>
              <div className="product-details-main">
                <p
                  className="product-name-main"
                  value={product?.id}
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
                  value={product?.id}
                  onClick={() => handleCartButton(product?.id)}
                  className="add-to-cart"
                >
                  Add to cart
                </button>
              ) : (
                  <OpenModalButton
                    className="add-to-cart"
                    buttonText={'Add to cart'}
                    modalComponent={<LoginMessage />}
                  />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default MainPage;
