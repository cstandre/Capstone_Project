import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userProducts } from "../../store/products";
import { useModal } from "../../context/Modal";
import { deleteProduct } from "../../store/products";



const UserStorePage = () => {
    const products = useSelector(state=>state?.products);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();


    useEffect(() => {
        dispatch(userProducts())
    }, [dispatch]);

    const addProduct = (e) => {
        e.preventDefault();
        history.push('/products/create');
    };

    const editProduct = async (e) => {
        e.preventDefault();
        const productId = e.target.value;
        history.push(`/products/${productId}/edit`);
    };

    const removeProduct = (e) => {
        e.preventDefault();
        const productId = e.target.value;
        dispatch(deleteProduct(productId));
    };

    return (
        <>
        {products && (
            Object.values(products).map((product, idx) =>
            <div key={idx}>
                <div>{product.product_name}</div>
                <div>Review Count: {product.reviews?.length}</div>
                <button value={product.id} onClick={editProduct}>Update</button>
                <button value={product.id} onClick={removeProduct}>Delete</button>
                <button onClick={addProduct}>Add</button>
            </div>
        ))}
        </>
    )
};

export default UserStorePage;
