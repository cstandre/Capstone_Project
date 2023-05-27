import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userProducts } from "../../store/products";



const UserStorePage = () => {
    const products = useSelector(state=>state?.products)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(userProducts())
    }, [dispatch]);

    const addProduct = (e) => {
        e.preventDefault();
        history.push('/products/create');
    };

    const editProduct = (e) => {
        e.preventDefault();
        history.push('/')
    };

    const deleteProduct = (e) => {
        e.preventDefault();
    };

    return (
        <>
        {products && (
            Object.values(products).map(product =>
            <div>
                <div>{product.product_name}</div>
                <div>Review Count: {product.reviews.length}</div>
                <button onClick={editProduct}>Update</button>
                <button onClick={deleteProduct}>Delete</button>
                <button onClick={addProduct}>Add</button>
            </div>
        ))}
        </>
    )
};

export default UserStorePage;
