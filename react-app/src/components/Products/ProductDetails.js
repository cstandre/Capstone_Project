import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../store/products";
import { addItem } from "../../store/cart";
import { loadReviews } from "../../store/reviews";

import './ProductDetails.css';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const sessionUser = useSelector(state=>state?.session?.user);
    const products = useSelector(state=>state?.products);
    const reviews = useSelector(state=>state?.reviews);
    const [ mainImg, setMainImg ] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const reviewArr = Object?.values(reviews)[0];

    const product = Object?.values(products)[0];
    // const product = productArr[0];

    useEffect(() => {
      dispatch(productDetails(productId));
      dispatch(loadReviews(productId));
    }, [dispatch, productId]);

    useEffect(() => {
      if (product) {
        setMainImg(product?.preview_image);
        // console.log(product?.preview_image)
      }
    }, [product]);

    const handleSelectChange = async (e) => {
      e.preventDefault();
      setSelectedQuantity(e.target.value)
    };

    const handleImgClick = (img) => {
      setMainImg(img);
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
        <div className="main-container">
          {product ? (
            <>
              <div className="side-img-container">
                {product?.product_images?.map((img, idx)=>
                  <img key={idx}  alt='' className="small-img" src={img.image} value={img.image} onClick={() => handleImgClick(img.image)}></img>
                )}
              </div>
              <div className="main-img-container">
                <img className="main-img" alt="" src={mainImg}></img>
              </div>
              <div className="product-info-container">
                <h2 className="product-detail-name">
                  {product?.product_name}
                </h2>
                <div className="prod-price">${product?.price}</div>
                <div className="deets-brand-container">
                  <p className="brand-txt">Brand:</p>
                  <p className="brand-name-deets">{product?.brand}</p>
                </div>
                <p className="about-item">About this item</p>
                <p className="product-detail-description">
                  {product?.description}
                </p>
              </div>
              <div className="cart-container">
                <div className="prod-cart-details">
                  <div className="buy-new">Buy New:</div>
                  <div className="prod-price">${product?.price}</div>
                  {sessionUser ? (
                    <div className="address">
                      Deliver to {sessionUser?.first_name} - {sessionUser.city} {sessionUser.zip}
                    </div>
                  ):(
                    <div></div>
                  )}
                  {product?.stock_quantity > 0 ? (
                    <p className="deets-in-stock">In Stock</p>
                  ): (
                    <p className="deets-no-stock">Out of Stock</p>
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
                      <div className="deets-cart-btn">
                        <button className="deets-add-to-cart" onClick={handleCartButton}>Add to cart</button>
                      </div>
                    </div>
                  ): (
                    <button value={productId} onClick={throwError}>Add to cart</button>
                  )}
                </div>
                {reviews? (
                  <div>
                    {Object?.values(reviews)?.map(review => (
                      <p>{review.review}</p>
                    ))}
                  </div>
                ): (
                  <>
                  </>
                )}
              </div>
            </>
          ): (
              <>
              </>
          )}

        </div>
      </div>
    )
};

export default ProductDetailsPage
