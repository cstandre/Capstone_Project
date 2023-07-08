import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { reviewDetails, editReview } from "../../store/reviews";


const EditReview = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(reviewDetails(reviewId));
    }, [reviewId, dispatch]);

    return (
        <div>

        </div>
    )
};


export default EditReview;
