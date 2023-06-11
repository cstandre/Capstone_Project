import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadItems, deleteItem, updateCartItem } from "../../store/cart";

import './cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);

    const products = Object?.values(cartItems)?.map((items) => ({
        ...items?.product,
        quantity: items?.quantity,
        cartId: items?.id
    }));

    const totalCartAmt = products?.reduce((acc, item) => acc + item?.quantity, 0) || 0;
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


    return (
        <div className="body">
            {sessionUser && products.length > 0 ? (
                <div className="main-section">
                    <div className="header-box">
                        <div className="cart-header">Shopping Cart</div>
                    </div>
                    {products?.map((product, idx) => (
                      <div key={idx} className="cart-item-wrapper">
                        <div className="cart-img-container">
                            <img alt="" className="cart-prev-img" src={product?.preview_image}></img>
                        </div>
                        <span className="cart-item-container">
                          <div className="cart-product">
                            <p>{product?.product_name}</p>
                          </div>
                          <div className="total">
                            <p className="price">${product?.price}</p>
                          </div>
                          <div className="stock-level">
                            {product?.stock_quantity > 0 ? (
                              <p className="in-stock">In Stock</p>
                            ) : (
                              <p className="no-stock">Out of Stock</p>
                            )}
                          </div>
                          <div className="brand-container">
                            <p className="brand">Brand: {product?.brand}</p>
                          </div>
                          <div className="cart-edit">
                            <select
                              id="mySelect"
                              value={product?.quantity}
                              onChange={(e) => handleSelectChange(product.cartId, e.target.value)}
                            >
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
                            <div className="delete-btn">
                              <button value={product?.cartId} onClick={handleDelete}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </span>
                      </div>
                    ))}
                    <div className="subtotal-box">
                        <span className="subtotal">Subtotal ({totalCartAmt} item):</span>
                        <span className="total">${subtotal}</span>
                    </div>
                </div>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
