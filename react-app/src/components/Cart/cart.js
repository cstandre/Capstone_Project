import React, { useEffect } from "react";
import { useDispatch, useSelector, useState } from "react-redux";
import { loadItems, deleteItem } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);
    // const [selectedQuantity, setSelectedQuantity] = useState("");

    const products = Object?.values(cartItems)?.map(items => items?.product);
    const subtotal = products?.reduce((acc, product) => acc + parseFloat(product?.price), 0).toFixed(2);


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
        console.log(e.target.value)
        // dispatch(deleteItem())
    };


    return (
        <div>
            {sessionUser && products?.length > 0 ? (
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
                            <button onClick={handleDelete} value={product}>Delete</button>
                        </div>
                    )}
                    {products?.length == 1 ? (
                        <p>Subtotal ({products?.length}) item: ${subtotal}</p>
                    ): (
                        <p>Subtotal ({products?.length}) items: ${subtotal}</p>
                    )}
                </div>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
