import React, { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProduct, productDetails } from "../../store/products";


const EditProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const products = useSelector(state=>state?.products);

    const product = Object?.values(products)[0];

    const [ product_name, setProductName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ stock_quantity, setStockQuantity ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        if (product) {
          setProductName(product.product_name || '');
          setPrice(product.price || '');
          setBrand(product.brand || '');
          setStockQuantity(product.stock_quantity || '');
          setDescription(product.description || '');
        }
      }, [product]);


    useEffect(() => {
        dispatch(productDetails(productId))
    }, [dispatch, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newProduct = {
            product_name,
            price,
            brand,
            stock_quantity,
            description
        };

        const updatedProduct = await dispatch(editProduct(newProduct, productId))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "One or more required fields are missing.";
                setErrors([errorMsg])
            }
        })
        if (updatedProduct) {
            history.push(`/products/${updatedProduct.id}`)
        };
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
                    <p className="header">Edit your product</p>
                    <div className="input-fields">
                        <label>
                            <h3>Product Name</h3>
                            <input
                                type="text"
                                onChange={(e) => setProductName(e.target.value)}
                                className="input"
                                required
                                value={product_name}
                            />
                        </label>
                        <label>
                            <h3>Description</h3>
                            <TextareaAutosize
                                type="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="description"
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
                                required
                                className="input"
                            />
                        </label>
                        <label>
                            <h3>Stock Quantity</h3>
                            <input
                                type="number"
                                value={stock_quantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                required
                                className="input"
                            />
                        </label>
                    </div>
                    <ul>{errors?.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
                    <div className="creates">
                        <button className="create-button" type="submit">Edit</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default EditProduct;
