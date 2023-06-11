import React from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { deleteProduct, userProducts } from "../../store/products";

import './DeleteProductModal.css'

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
                <p className="delete-title">Confirm Delete</p>
                <div className="delete-confirm">Are you sure you want to delete this product?</div>
                <div className="delete-buttons">
                <button className="delete-button" onClick={handleClick}><div className="btn-txt">Yes (Delete)</div></button>
                <button className="cancel-button" onClick={closeModal}><div className="btn-txt">No (Cancel)</div></button>
                </div>
            </div>
        </>
    )
}


export default DeleteProductModal
