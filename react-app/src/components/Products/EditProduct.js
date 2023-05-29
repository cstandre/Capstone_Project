import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProduct, productDetails } from "../../store/products";


const EditProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const product = useSelector(state=>state?.products[productId]);
    console.log(product)

    const [ product_name, setProductName ] = useState(product.product_name);
    const [ price, setPrice ] = useState(product.price);
    const [ brand, setBrand ] = useState(product.brand);
    const [ stock_quantity, setStockQuantity ] = useState(product.stock_quantity);
    const [ description, setDescription ] = useState(product.description);
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        dispatch(productDetails(productId))
    }, [dispatch, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newProduct = {
            id: productId,
            product_name,
            price,
            brand,
            stock_quantity,
            description,
        };

        const updatedProduct = await dispatch(editProduct(newProduct))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "One or more required fields are missing.";
                setErrors([errorMsg])
            }
        })
        if (updatedProduct) {
            history.push(`/products/${updatedProduct.id}`)
        }

    }

    return (
        <form className="create-product" onSubmit={handleSubmit}>
            <div>
                <h1>Edit your product</h1>
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
                <button className="create-button" type="submit">Edit</button>
            </div>
        </form>
    )
};

export default EditProduct;
