import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../store/products";


const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const sessionUser = useSelector(state=>state?.session?.user);
    const product = useSelector(state=>state?.products)

    useEffect(() => {
        dispatch(productDetails(productId))
    }, [dispatch, productId])

    return (
        <>
        {product?.product_name}
        {product?.brand}
        {product?.description}
        {product?.product_images?.map(img=><img src={img.url}></img>)}
        {product?.reviews?.map(review=>review.review)}
        </>
    )
};

export default ProductDetailsPage
