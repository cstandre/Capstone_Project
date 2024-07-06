import React from "react";
import { useModal } from "../../context/Modal";

import './ReviewImgModal.css';

const ReviewImgModal = (review) => {
    const { closeModal } = useModal();

    return (
        <>
            <div className="review-modal-container">
                <button className="fa-solid fa-x" onClick={closeModal}></button>
                <div className="area1">
                    <img
                        alt=""
                        className="rev_currImg"
                        src={review?.currImg}
                    />
                </div>
                <div className="area2">
                    <div className="owner-info-mod">
                        <img alt="" className="profile-img-mod" src="https://caitlyn.s3.us-west-2.amazonaws.com/profile+picture.jpg"
                        />
                        <div className="rev-owner-name">{review?.review.owner_name}</div>
                    </div>
                    <div className="stars-header-mod">
                        <span className="rev-mod-stars">
                            {Array(5).fill().map((_, idx) => (
                                <i
                                    key={idx}
                                    className={`fa${idx < review?.review?.stars ? 's' : 'r'} star-review fa-star ${idx < review?.review?.stars ? 'filled2' : ''}`}
                                    value={idx}
                                >
                                </i>
                            ))}
                        </span>
                        <div className="rev-mod-header">{review?.review.header}</div>
                    </div>
                    <div className="rev-mod-rev">{review?.review.review}</div>
                    <div className="rev-img-container">
                        <div className="img-txt-mod">Images in this review</div>
                        {review?.review?.review_images?.map((img, idx) =>
                            <img
                                key={idx}
                                alt=""
                                className={`review-img ${idx}`}
                                src={img}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


export default ReviewImgModal;
