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


    useEffect(() => {
        dispatch(userProducts());
    }, [dispatch]);

    const addProduct = (e) => {
        e.preventDefault();
        history.push('/products/create');
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const productId = e.target.value;
        history.push(`/products/${productId}/edit`);
    };

    const handleProductDetail = (e) => {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        // console.log(productId)
        history.push(`/products/${productId}`);
    };

    return (
        <>
        <h1>{sessionUser?.first_name}'s Store</h1>
        <button onClick={addProduct}>Sell More</button>
        {products ? (
            Object.values(products)?.map((product, idx) =>
            <div key={idx}>
                <div className="img-container" value={product?.id} onClick={handleProductDetail}>
                    <img className="user-store-img" alt='' src={product?.preview_image} data-product-id={product?.id} />
                </div>
                <div>{product?.product_name}</div>
                <div>Review Count: {product?.reviews?.length}</div>
                <button value={product?.id} onClick={handleEdit}>Update</button>
                <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<DeleteProductModal productId={product?.id} />}
                />
            </div>
        )): (
            <>
                <h1>Get started today!</h1>
            </>
        )}
        </>
    )
};

export default UserStorePage;
