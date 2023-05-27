import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProductFetch } from "../../store/products";


const CreateProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ product_name, setProductName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ brand, setBrand ] = useState("");
    const [ stock_quantity, setStockQuantity ] = useState(0);
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

    }

    return (
        <form className="create-product" onSubmit={handleSubmit}>
            <div>
                <h1>Create your product</h1>
            </div>
            <ul>{errors?.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
            <div>
                <div>Product Name</div>
                <input
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                    className="input"
                    value={product_name}
                />
            </div>
            <div>
                <div>Description</div>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                />
            </div>
            <div>
                <div>Brand</div>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input"
                />
            </div>
            <div>
                <div>price</div>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input"
                />
            </div>
            <div>
                <div>Stock Quantity</div>
                <input
                    type="number"
                    value={stock_quantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="input"
                />
            </div>
            <div className="creates">
                <button className="create-button" type="submit">Create</button>
            </div>
        </form>
    )
};

export default CreateProduct;
