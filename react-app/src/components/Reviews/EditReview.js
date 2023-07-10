import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { reviewDetails, editReview } from "../../store/reviews";
import TextareaAutoSize from 'react-textarea-autosize';
import { productDetails } from "../../store/products";


const EditReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();
    const { productId } = useParams();
    const reviewDeets = useSelector(state=>state?.reviews);
    const productDeets = useSelector(state=>state?.products);

    const userReview = Object.values(reviewDeets)[0];
    const product = Object.values(productDeets)[0];


    const [ header, setHeader ] = useState('');
    const [ review, setReview ] = useState('');
    const [ stars, setStars ] = useState('');
    const [ errors, setErrors ] = useState([]);


    useEffect(() => {
        if (userReview) {
            setHeader(userReview.header || '');
            setReview(userReview.review || '');
            setStars(userReview.stars || '');
        }
      }, [userReview]);

    useEffect(() => {
        dispatch(reviewDetails(reviewId));
        dispatch(productDetails(productId));
    }, [dispatch, reviewId, productId]);

    const ratingClick = (e,n) => {
        e.preventDefault();
        setStars(n);
    };

    const productPage = () => {
        history.push(`/products/${productId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const userReview = {
            header,
            review,
            stars
        };
        // console.log(newReview)

        const updatedReview = await dispatch(editReview(userReview, reviewId));
        if (updatedReview) {
            // const formData = new FormData();
            // const reviewId = createdReview.id
            // // console.log(images)
            // images.forEach(img => {
            //   formData.append('image[]', img);
            // });

            // // console.log(createdReview.id)
            // const res = await fetch(`/api/reviews/${reviewId}/images`, {
            //     method: "POST",
            //     body: formData,
            // });


            // if (res.ok) {
            //     await res.json();
            //     history.push('/');
            // };
            history.push(`/products/${productId}`)
        }
    };

    return (
        <div className="review-form-container">
            <h1 className="review-form-header">Edit Review</h1>
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
                        <h3 className="review-form-subhead">Overall Rating</h3>
                        <span>
                            {Array(5).fill().map((_,idx) => (
                                <i
                                key={idx}
                                className="fa-regular fa-star"
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
                        />
                    </div>
                    {/* <label>
                        <h3>Add a photo</h3>
                        <p>Shoppers fine images more helpful than text alone.</p>
                        <input
                            type="file"
                            id="file"
                            accept="images/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="add-img-container">
                        <i className="fa-solid fa-plus"></i>
                        </div>
                    </label> */}
                    <div className="review-form-section">
                        <h3 className="review-form-subhead">Add a written review</h3>
                        <TextareaAutoSize
                            type="textarea"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="review-area-extended"
                            placeholder="What did you like or dislike? What did you use this product for?"
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
