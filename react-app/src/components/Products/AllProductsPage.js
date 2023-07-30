import React, { useEffect } from "react";
import { loadProducts } from "../../store/products";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './AllProductsPage.css'

const AllProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state=>state?.session?.user)
    const products = useSelector(state=>state?.products);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
    };

    const items = Object.values(products).flatMap(item => Object.values(item));

    const randomItems = shuffleArray(items)

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    // useEffect(() => {
    //     if (products) {
    //         items = Object.values(products).flatMap(item => Object.values(item))
    //     };
    // });

    const handleProductDetail = (productId) => {
        history.push(`/products/${productId}`);
    };

    return (
        <div>
            {randomItems.length ? (
                <div className="cat-store-container">
                    <img alt="" className="category-banner" src="https://caitlyn.s3.us-west-2.amazonaws.com/search-page-header.jpg"></img>
                    <div className="cat-product-container">
                        {randomItems?.map((product, idx) => (
                            <div key={idx} className="cat-each-container">
                                <div className="img-container" value={product?.id} onClick={() => handleProductDetail(product?.id)}>
                                    <img className="user-store-img" alt='' src={product?.preview_image} />
                                </div>
                                <div className="cat-product-details">
                                    <div className="cat-product-name" value={product?.id} onClick={() => handleProductDetail(product?.id)}>
                                        {product?.product_name}
                                    </div>
                                    <div className="price-rating">
                                        <div className="review-count">
                                            {product?.reviews?.length ? (
                                                <div>
                                                    <i className="fa-solid fa-star" /> {product?.reviews?.length}
                                                </div>
                                            ): <div>
                                                <i className="fa-regular fa-star" />
                                                0
                                                </div>}
                                        </div>
                                        <div className="cat-price">
                                            $ {product?.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ): (
                <div className="store-container">
                    <div className="header-container">
                        <p>{sessionUser?.first_name && sessionUser?.first_name?.charAt(0).toUpperCase() + sessionUser?.first_name?.slice(1).toLowerCase()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;
