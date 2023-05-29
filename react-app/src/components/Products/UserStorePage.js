import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userProducts } from "../../store/products";
import DeleteProductModal from "./DeleteProductModal";
import OpenModalButton from "../OpenModalButton";



const UserStorePage = () => {
    const products = useSelector(state=>state?.products);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


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

    return (
        <>
        <button onClick={addProduct}>Add</button>
        {products ? (
            Object.values(products).map((product, idx) =>
            <div key={idx}>
                <div>{product.product_name}</div>
                <div>Review Count: {product.reviews?.length}</div>
                <button value={product.id} onClick={editProduct}>Update</button>
                <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<DeleteProductModal productId={product.id} />}
                />
            </div>
        )): (
            <>
            </>
        )}
        </>
    )
};

export default UserStorePage;
