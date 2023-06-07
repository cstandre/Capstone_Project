import React from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteProduct, userProducts } from "../../store/products";



const DeleteProductModal = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteProduct(productId));
        dispatch(userProducts());
        closeModal();
    };

    return (
        <>
            <div className="delete-form">
                <h1 className="delete-title">Confirm Delete</h1>
                <div className="delete-confirm">Are you sure you want to delete this product?</div>
                <div className="delete-buttons">
                <button className="delete-button" onClick={handleClick}>Yes (Delete)</button>
                <button className="delete-button" onClick={closeModal}>No</button>
                </div>
            </div>
        </>
    )
}


export default DeleteProductModal
