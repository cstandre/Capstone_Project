import React, { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
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

    const [selectedImages, setselectedImages] = useState([]);
    const [previewImage, setPreviewImage] = useState("");

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("Please select up to 5 files only.");
            return;
        };

        setselectedImages(files.slice(1))
        setPreviewImage(files[0]);
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newProduct = {
            product_name,
            price,
            brand,
            stock_quantity,
            description
        };

        const product = await dispatch(createProductFetch(newProduct))

        if (Array.isArray(product) && product.length > 0) {
            setErrors(product);
        } else {
            const formData = new FormData();

            formData.append('image[]', previewImage);
            formData.append(`is_preview_0`, true);

            selectedImages.forEach(img => {
              formData.append('image[]', img);
            });
            const res = await fetch(`/api/images/${product.id}`, {
                method: "POST",
                body: formData,
            });


            if (res.ok) {
                await res.json();
                history.push(`/products/${product.id}`);
            };
        }
    };

    const homeClick = (e) => {
        e.preventDefault()
        history.push('/')
    };

    return (
        <div className="form">
            <form
            onSubmit={handleProductSubmit}
            encType="multipart/form-data"
            >
                <div className="img">
                    <img className="logo" alt="" onClick={homeClick} src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
                </div>
                <div className="form-content">
                    <p className="header">Product Details</p>
                    <div className="input-fields">
                        <label>
                            <h3>Product Name</h3>
                            <input
                                type="text"
                                onChange={(e) => setProductName(e.target.value)}
                                className="description"
                                value={product_name}
                                required
                            />
                        </label>
                        <label>
                            <h3>Description</h3>
                            <TextareaAutosize
                                type="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                                required
                            />
                        </label>
                        <label>
                            <h3>Price</h3>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input"
                                required
                            />
                        </label>
                        <label>
                            <h3>Stock Quantity</h3>
                            <input
                                type="number"
                                value={stock_quantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                className="input"
                                required
                            />
                        </label>
                        <h3>Add a photo</h3>
                        <p>Choose 1-5 photos to help buyers</p>
                        <div className="add-img-container">
                            <label htmlFor="file">
                              <i className="fa-solid fa-plus"></i>
                            </label>
                            <input
                              type="file"
                              id="file"
                              accept="images/*"
                              multiple
                              onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <ul>
                    {errors?.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                    </ul>
                    <div className="creates">
                        <button className="create-button" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CreateProduct;
