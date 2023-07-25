import React, { useEffect } from "react";
import { loadProducts } from "../../store/products";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AllProductsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state=>state?.products.products);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);


    return (
        <>
        {products && Object?.values(products)?.map((product) => (
            <div key={product?.id} >
                <p>{product?.product_name}</p>
                <img alt="" src={product?.preview_image}></img>
                <p>{product?.reviews?.length}</p>
                <p>{product?.price}</p>
            </div>
        ))}
        </>
    );
};

export default AllProductsPage;
