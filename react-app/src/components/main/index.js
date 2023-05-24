import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadProducts } from '../../store/products';

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    return(
        <>
        
        </>
    )
}

export default MainPage;
