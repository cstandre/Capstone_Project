import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails } from "../../store/products";
import { newReview } from "../../store/reviews";
import TextareaAutoSize from 'react-textarea-autosize';

import './CreateReview.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const products = useSelector(state=>state?.products)
    const product = Object.values(products)[0]

    const [header, setHeader] = useState('');
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(productDetails(productId));
    }, [productId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            productId,
            header,
            review,
            stars,
            images
        };

        const createdReview = await dispatch(newReview(newReview));

    };


    return (
        <div className="review-form">
            <h1>Create Review</h1>
            <img className="product-img" alt="" src={product?.preview_image}></img>
            <p>{product?.product_name}</p>

            <div className="review-form">
                <form onSubmit={handleSubmit}>
                    <h3>Overall Rating</h3>
                    <label>
                        <h3>Add a headline</h3>
                        <input
                            type="text"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            placeholder="What's most important to know?"
                        />
                    </label>
                    <label>
                        <h3>Add a photo</h3>
                        <p>Shoppers fine images more helpful than text alone.</p>
                        <div className="add-img-container">
                        <i className="fa-solid fa-plus"></i>
                        </div>
                    </label>
                    <label>
                        <h3>Add a written review</h3>
                        <TextareaAutoSize
                            type="textarea"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="review-area"
                            placeholder="What did you like or dislike? What did you use this product for?"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateReview;
