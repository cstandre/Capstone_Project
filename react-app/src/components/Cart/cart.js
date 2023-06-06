import React, { useEffect } from "react";
import { useDispatch, useSelector, useState } from "react-redux";
import { loadItems, deleteItem, updateCartItem } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);

    const products = Object.values(cartItems).map((items) => ({
        ...items?.product,
        quantity: items?.quantity,
        cartId: items?.id
    }));

    const totalCartAmt = products?.reduce((acc, item) => acc + item?.quantity, 0)
    const subtotal = products?.reduce((acc, product) => acc + parseFloat(product?.price * product?.quantity), 0).toFixed(2);

    useEffect(() => {
        dispatch(loadItems());
    }, [dispatch]);

    const handleSelectChange = async (productId, quantityAmt) => {
        const numbQuant = Number(quantityAmt);
        const numbProdId = Number(productId);
        await dispatch(updateCartItem(numbProdId, numbQuant));
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const productId = e.target.value
        dispatch(deleteItem(Number(productId)))
    };

    const handleReducer = async (productId, quantityAmt) => {
        const numProdId = Number(productId);
        const numQuant = Number(quantityAmt);
        const newQuant = numQuant - 1;
        await dispatch(updateCartItem(numProdId, newQuant));
    }


    return (
        <div>
            {sessionUser && cartItems ? (
                <div>
                    {products?.map((product, idx) =>
                        <div key={idx}>
                            <p>{product?.product_name}</p>
                            <p>{product?.price}</p>
                            {product?.stock_quantity > 0 ? (
                                <p>In Stock</p>
                            ): (
                                <p>Out of Stock</p>
                            )}
                            <p>Brand: {product?.brand}</p>
                            <select id='mySelect' value={product?.quantity} onChange={(e) => handleSelectChange(product.cartId, e.target.value)}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                            {product.quantity > 1 ? (
                                <div><button  value={product?.cartId} onClick={() => handleReducer(product?.cartId, product?.quantity)}>Delete</button></div>
                            ): (
                                <div><button value={product?.cartId} onClick={handleDelete}>Delete</button></div>
                            )}
                        </div>
                    )}
                    {cartItems ? (
                        <p>Subtotal ({totalCartAmt}) item: ${subtotal}</p>
                    ): (
                        <p>Subtotal ({totalCartAmt}) items: ${subtotal}</p>
                    )}
                </div>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
