const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const UPDATE_REVIEW = 'review UPDATE_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const readReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const userReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});


const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
});

export const createReviewFetch = (createdReview) => async (dispatch) => {
    const { productId, header, review, stars } = createdReview;
    const numProdId = Number(productId);

    const res = await fetch(`/api/reviews/${numProdId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            header,
            review,
            stars
        })
    });

    if (res.ok) {
        const newReview = await res.json();
        dispatch(createReview(newReview));
        return newReview;
    };
};

export const loadReviews = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(readReviews(reviews));
        return reviews;
    };
};

export const reviewDetails = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`)

    if (res.ok) {
        const review = await res.json();
        dispatch(readReviews(review));
        return review;
    };
};


export const editReview = (reviewDeets, reviewId) => async (dispatch) => {
    const { header, review, stars } = reviewDeets;

    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            header,
            review,
            stars
        })
    });

    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(updateReview(updateReview));
        return updatedReview;
    };
};


export const removeReviews = (reviewId) => async (dispatch) => {
    const res = await fetch (`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(deleteReview(reviewId));
        return review
    };
};


const initialState = {};

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_REVIEWS:
            return { reviews: action.reviews };
        case CREATE_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case UPDATE_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case DELETE_REVIEW:
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    };
}
