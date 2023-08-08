import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { reviewDetails, editReview } from "../../store/reviews";
import TextareaAutoSize from 'react-textarea-autosize';
import { productDetails } from "../../store/products";


const EditReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userReview = useSelector(state=>state?.reviews?.reviews);
    const product = useSelector(state=>state?.products?.products);

    const [ header, setHeader ] = useState('');
    const [ review, setReview ] = useState('');
    const [ stars, setStars ] = useState('');
    const [ filledStars, setFilledStars ] = useState(0);
    const [ errors, setErrors ] = useState([]);


    useEffect(() => {
        if (userReview) {
            setHeader(userReview?.header || '');
            setReview(userReview?.review || '');
            setStars(userReview?.stars || '');
            setFilledStars(userReview?.stars || 0);
        }
    }, [userReview]);

    useEffect(() => {
        dispatch(reviewDetails(userReview?.id));
        dispatch(productDetails(product?.id));
    }, [dispatch, userReview?.id, product?.id]);

    const ratingClick = (e, n) => {
        e.preventDefault();
        setFilledStars(n);
        setStars(n);
    };

    const productPage = (e) => {
        e.preventDefault();
        history.push(`/products/${product.id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (stars === 0) {
            setErrors(["Please select a rating"]);
            return;
        };

        const userReview = {
            header,
            review,
            stars,
        };
        // console.log(newReview)
        console.log(userReview.id, 'right before the edit review dispatch')
        const updatedReview = await dispatch(editReview(userReview, userReview?.id));
        if (updatedReview) {
            history.push(`/products/${product?.id}`)
        };
    };

    return (
        <div className="review-form-container">
            <h1 className="review-form-header">Edit Review</h1>
            <div className="review-product-deets">
                <img className="product-img" alt="" src={product?.preview_image} onClick={(e) => productPage(e)}></img>
                <p className="review-product-name" onClick={(e) => productPage(e)}>{product?.product_name}</p>
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
};


export default EditReview;
