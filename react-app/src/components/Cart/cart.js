import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadItems } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);

    const products = Object?.values(cartItems)?.map(items => items?.product)

    useEffect(() => {
        dispatch(loadItems())
    }, [dispatch]);


    return (
        <div>
            {sessionUser && products?.length > 0 ? (
                <div>
                    {products?.map((product, idx) =>
                        <div key={idx}>
                            <p>{product.product_name}</p>
                            <p>{product.price}</p>
                        </div>
                    )}
                </div>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
