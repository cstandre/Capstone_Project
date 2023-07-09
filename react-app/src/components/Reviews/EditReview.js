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
        <div className="review-form">
            <h1>Edit Review</h1>
            <img className="product-img" alt="" src={product?.preview_image}></img>
            <p>{product?.product_name}</p>

            <div className="review-form">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <h3>Overall Rating</h3>
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
                    <label>
                        <h3>Add a headline</h3>
                        <input
                            type="text"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            placeholder="What's most important to know?"
                        />
                    </label>
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
};


export default EditReview;
