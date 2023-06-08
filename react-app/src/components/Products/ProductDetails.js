import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../store/products";
import { addItem } from "../../store/cart";

import './ProductDetails.css';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const sessionUser = useSelector(state=>state?.session?.user);
    const product = useSelector(state=>state?.products);
    const [ mainImg, setMainImg ] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
      dispatch(productDetails(productId));
    }, [dispatch, productId]);

    useEffect(() => {
      if (product) {
        setMainImg(product?.preview_image);
      }
    }, [product]);

    const handleSelectChange = async (e) => {
      e.preventDefault();
      setSelectedQuantity(e.target.value)
    };

    const handleCartButton = async (e) => {
      e.preventDefault();
      await dispatch(addItem(productId, selectedQuantity));
      history.push('/cart');
    };

    const throwError = (e) => {
      e.preventDefault();
      alert('Login to add item to your cart!')
    };

    return (
        <div className="product-page">
        {product ? (
            <>
            <div className="side-img-container">
              {product?.product_images?.map((img, idx)=>
                <img key={idx}  alt='' className="small-img" src={img.image}></img>
              )}
              </div>
            <div className="main-img-container">
              <img className="main-img" alt="" src={mainImg}></img>
            </div>
            <div className="product-info-container">
              <h2>{product?.product_name}</h2>
              {product?.brand}
              <p>{product?.description}</p>
            </div>
            <div className="cart-container">
              ${product?.price}
              {sessionUser ? (
                <div>
                  Deliver to {sessionUser?.first_name} - {sessionUser.city} {sessionUser.zip}
                </div>
              ):(
                <div></div>
              )}
              {product?.stock_quantity > 0 ? (
                <p>In Stock</p>
              ): (
                <p>Out of Stock</p>
              )}
              {sessionUser ? (
                <div>
                  <select id='mySelect' value={selectedQuantity} onChange={handleSelectChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                  <button onClick={handleCartButton}>Add to cart</button>
                </div>
              ): (
                <button value={productId} onClick={throwError}>Add to cart</button>
              )}
            </div>
            </>
        ): (
            <>
            </>
        )}
        </div>
    )
};

export default ProductDetailsPage
