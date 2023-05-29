import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProductFetch } from "../../store/products";

import './CreateProducts.css'

const CreateProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ product_name, setProductName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ brand, setBrand ] = useState("");
    const [ stock_quantity, setStockQuantity ] = useState(1);
    const [ description, setDescription ] = useState("");
    const [ errors, setErrors ] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newProduct = {
            product_name,
            price,
            brand,
            stock_quantity,
            description,
        };

        const product = await dispatch(createProductFetch(newProduct))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "One or more required fields are missing.";
                setErrors([errorMsg])
            }
        })
        if (product) {
            history.push(`/products/${product.id}`)
        }

    };

    const homeClick = (e) => {
        e.preventDefault()
        history.push('/')
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="img">
                    <img className="logo" alt="" onClick={homeClick} src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
                </div>
                <div className="form-content">
                    <p className="header">Create your product</p>
                    <div className="input-fields">
                        <label>
                            <h3>Product Name</h3>
                            <input
                                type="text"
                                onChange={(e) => setProductName(e.target.value)}
                                className="input"
                                value={product_name}
                            />
                        </label>
                        <label>
                            <h3>Description</h3>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input"
                            />
                        </label>
                        <label>
                            <h3>Brand</h3>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="input"
                            />
                        </label>
                        <label>
                            <h3>price</h3>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input"
                            />
                        </label>
                        <label>
                            <h3>Stock Quantity</h3>
                            <input
                                type="number"
                                value={stock_quantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                className="input"
                            />
                        </label>
                    </div>
                    <ul>{errors?.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                    <div className="creates">
                        <button className="create-button" type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CreateProduct;
