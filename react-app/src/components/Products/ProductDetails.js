import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../store/products";

import './ProductDetails.css';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const sessionUser = useSelector(state=>state?.session?.user);
    const product = useSelector(state=>state?.products);
    const [ mainImg, setMainImg ] = useState(null);


    useEffect(() => {
        dispatch(productDetails(productId));
      }, [dispatch, productId]);

      useEffect(() => {
        if (product) {
          setMainImg(product.preview_image);
        }
      }, [product]);

    return (
        <div className="product-page">
        {product ? (
            <>
            <div className="side-img-container">
              {product.product_images?.map((img, idx)=>
                <img key={idx} className="small-img" src={img.url}></img>
              )}
              </div>
            <div className="main-img-container">
              <img className="main-img" alt="" src={mainImg}></img>
            </div>
            <div className="product-info-container">
              <h2>{product.product_name}</h2>
              {product.brand}
              <p>{product.description}</p>
            </div>
            <div className="cart-container">
              <form>
                <input
                  type="select"
                />
              </form>
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
