import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../store/products";
import { addItem } from "../../store/cart";

import './ProductDetails.css';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
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
          setMainImg(product.preview_image);
        }
      }, [product]);

      const handleSelectChange = async (e) => {
        e.preventDefault();
        setSelectedQuantity(e.target.value)
      };

      const handleCartButton = (e) => {
        e.preventDefault();
        dispatch(addItem(productId, selectedQuantity))
      }

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
              ${product?.price}
              Deliver to {sessionUser.first_name} - {sessionUser.city} {sessionUser.zip}
              {product?.stock_quantity > 0 ? (
                <p>In Stock</p>
              ): (
                <p>Out of Stock</p>
              )}
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
            </>
        ): (
            <>
            </>
        )}
        </div>
    )
};

export default ProductDetailsPage
