import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadProducts } from "../../store/products";
import { addItem } from "../../store/cart";
import LoginMessage from "../ ErrorModals/loginModal"
import OpenModalButton from "../OpenModalButton";
import BannerSlider from "./BannerSlider";

import "./main.css";

const MainPage = () => {
  const history = useHistory();
  const products = useSelector((state) => state?.products);
  const sessionUser = useSelector((state) => state?.session.user);
  const dispatch = useDispatch();
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    const productsArr = Object.values(products)?.flatMap(product => Object.values(product));
    const randomProducts = productsArr?.sort(() => Math.random() - Math.random()).slice(0, 5);
    setRandomProducts(randomProducts);
  }, [products]);

  const handleCartButton = (id) => {
    dispatch(addItem(id, 1));
  };

  const handleProductDetail = (productId) => {
    history.push(`/products/${productId}`);
  };

  return (
    <div className="body">
      <div><BannerSlider /></div>
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
