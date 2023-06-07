import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userProducts } from "../../store/products";
import DeleteProductModal from "./DeleteProductModal";
import OpenModalButton from "../OpenModalButton";

import './UserStorePage.css';

const UserStorePage = () => {
    const sessionUser = useSelector(state=>state?.session?.user)
    const products = useSelector(state=>state?.products);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(products)


    useEffect(() => {
        dispatch(userProducts());
    }, [dispatch]);

    const addProduct = (e) => {
        e.preventDefault();
        history.push('/products/create');
    };

    const handleEdit = (productId) => {
        // console.log(productId)
        history.push(`/products/${productId}/edit`);
    };

    const handleProductDetail = (productId) => {
        // console.log(productId)
        history.push(`/products/${productId}`);
    };

    return (
        <div>
            {products ? (
                <>
                    <div className="store-container">
                        <div className="header-container">
                            <p>{sessionUser?.first_name && sessionUser?.first_name?.charAt(0).toUpperCase() + sessionUser?.first_name?.slice(1).toLowerCase()}</p>
                            <div className="sell-more-container">
                                <button className="sell-more-btn" onClick={addProduct}>Sell More</button>
                            </div>
                        </div>
                    </div>
                    <div className="product-container">
                        {Object?.values(products)?.map((product, idx) => (
                            <div key={idx}>
                                <div className="img-container" value={product?.id} onClick={() => handleProductDetail(product?.id)}>
                                    <img className="user-store-img" alt='' src={product?.preview_image} />
                                </div>
                                <div className="buttons">
                                    <button className="update-btn" value={product?.id} onClick={() => handleEdit(product?.id)}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <OpenModalButton
                                        buttonText={"Delete"}
                                        modalComponent={<DeleteProductModal productId={product?.id} />}
                                    />
                                </div>
                                <div className="product-details">
                                    <div className="product-name">
                                        {product?.product_name}
                                    </div>
                                    <div>
                                        Review Count: {product?.reviews?.length}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ): (
                <div className="store-container">
                <div className="header-container">
                    <p>{sessionUser?.first_name && sessionUser?.first_name?.charAt(0).toUpperCase() + sessionUser?.first_name?.slice(1).toLowerCase()}</p>
                    <div className="sell-more-container">
                        <button className="sell-more-btn" onClick={addProduct}>Sell Today</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
};

export default UserStorePage;
