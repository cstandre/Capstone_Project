import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadItems } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const cartItems = useSelector(state=>state?.cartItems);

    const products = Object?.values(cartItems)?.map(items => items?.product)
    console.log(products, "console.log # 1")
    const product = products?.map(product => product)
    console.log(product, "console.log # 2")

    // const product = products?.forEach(product => product?.product_name)
    // console.log(product, "2nd console.log")

    useEffect(() => {
        dispatch(loadItems())
    }, [dispatch]);


    return (
        <div>
            {sessionUser && products?.length > 0 ? (
                <div>
                    {/* {products.forEach(product => product.product_name)} */}
                </div>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
