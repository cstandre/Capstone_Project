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
    const prevImg = useSelector(state=>state?.products?.preview_image);
    const [mainImg, setMainImg] = useState(prevImg);
    console.log(mainImg)


    useEffect(() => {
        dispatch(productDetails(productId))
    }, [dispatch, productId]);


    // const imgUrl = product?.preview_image;
    // console.log(imgUrl);
    // console.log(mainImg);



    return (
        <>
        {product ? (
            <>
            {product.product_images?.map((img, idx)=><div key={idx} className="img-side"><img className="detail-page-img" src={img.url}></img></div>)}
            <img alt="" src={mainImg}></img>
            {product.product_name}
            {product.brand}
            {product.description}
            {product.reviews?.map(review=>review.review)}
            </>
        ): (
            <>
            </>
        )}
        </>
    )
};

export default ProductDetailsPage
