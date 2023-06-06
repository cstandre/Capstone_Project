import React, { useEffect } from "react";
import { useDispatch, useSelector, useState } from "react-redux";
import { loadItems, deleteItem, updateCartItem } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);
    // const [quantity, setQuantity] = useState('');

    const products = Object.values(cartItems).map((items) => ({
        ...items?.product,
        quantity: items?.quantity,
        cartId: items?.id
      }));

    const subtotal = products?.reduce((acc, product) => acc + parseFloat(product?.price), 0).toFixed(2);
    const totalCartAmt = products?.reduce((acc, item) => acc + item?.quantity, 0)


    useEffect(() => {
        dispatch(loadItems());
    }, [dispatch]);

    // const handleSelectChange = async (e) => {
    //     e.preventDefault();
    //     setSelectedQuantity(e.target.value)
    //     console.log(selectedQuantity)
    //   };

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
                            <p>{product.quantity}</p>
                            {/* <select id='mySelect' value={selectedQuantity} onChange={handleSelectChange}>
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
                            </select> */}
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
