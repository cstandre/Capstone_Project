import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadItems } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state?.session?.user);
    const items = useSelector(state=>state?.items)

    useEffect(() => {
        dispatch(loadItems())
    }, [dispatch]);


    return (
        <div>
            {sessionUser && items ? (
                <h1>display items</h1>
            ): (
                <h1>Your Amazon Cart is empty</h1>
            )}
        </div>
    )
};

export default Cart;
