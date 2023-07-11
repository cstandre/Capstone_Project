import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { productDetails } from "../../store/products";
import { createReviewFetch } from "../../store/reviews";
import TextareaAutoSize from 'react-textarea-autosize';

import './CreateReview.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const history = useHistory();
    const products = useSelector(state=>state?.products);
    const product = Object.values(products)[0]

    const [header, setHeader] = useState('');
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [images, setImages] = useState([]);
    const [filledStars, setFilledStars] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(productDetails(productId));
    }, [productId, dispatch]);

    const ratingClick = (e, n) => {
        e.preventDefault();
        setFilledStars(n);
        setStars(n);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("Please select up to 5 files only.");
            return;
        };

        setImages(files)
    };

    const productPage = () => {
        history.push(`/products/${productId}`)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (stars === 0) {
            setErrors(["Please select a rating"]);
            return;
        };

        const userReview = {
            productId,
            header,
            review,
            stars,
            images
        };
        // console.log(newReview)

        const createdReview = await dispatch(createReviewFetch(userReview));

        if (createdReview) {
            const formData = new FormData();
            const reviewId = createdReview.id
            // console.log(images)
            images.forEach(img => {
              formData.append('image[]', img);
            });

            // console.log(createdReview.id)
            const res = await fetch(`/api/reviews/${reviewId}/images`, {
                method: "POST",
                body: formData,
            });


            if (res.ok) {
                await res.json();
                history.push('/');
            };
        };
    };

    return (
        <div className="review-form-container">
            <h1 className="review-form-header">Create Review</h1>
            <div className="review-product-deets">
                <img className="product-img" alt="" src={product?.preview_image} onClick={productPage}></img>
                <p className="review-product-name" onClick={productPage}>{product?.product_name}</p>
            </div>
            <div className="review-form">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="review-form-section">
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                        ))}
                        <h3 className="review-form-subhead">Overall Rating</h3>
                        <span>
                            {Array(5).fill().map((_,idx) => (
                                <i
                                key={idx}
                                className={`fa${idx < filledStars ? 's' : 'r'} fa-star ${idx < filledStars ? 'filled' : ''}`}
                                value={idx}
                                onClick={(e) => ratingClick(e, idx + 1)}
                                >
                                </i>
                            ))}
                        </span>
                    </div>
                    <div className="review-form-section">
                        <h3 className="review-form-subhead">Add a headline</h3>
                        <input
                            type="text"
                            className="review-area"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            placeholder="What's most important to know?"
                            required
                        />
                    </div>
                    <div className="review-form-section">
                        <h3 className="review-form-subhead">Add a photo</h3>
                        <p>Shoppers find image more helpful than text alone.</p>
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
                    <div className="review-form-section">
                        <h3 className="review-form-subhead">Add a written review</h3>
                        <TextareaAutoSize
                            type="textarea"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="review-area-extended"
                            placeholder="What did you like or dislike? What did you use this product for?"
                            required
                        />
                    </div>
                    <button className="review-submit-btn" type="submit">
                        <p className="review-submit-txt">Submit</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateReview;
