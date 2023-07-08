const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const EDIT_REVIEW = 'review/EDIT_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const readReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const userReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const updateReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
});


export const loadReviews = (productId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${productId}`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(readReviews(reviews));
        return reviews;
    };
};

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

export const addReviewImages = (reviewId, images) => async (dispatch) => {
    const res = await fetch(`/api/images/${reviewId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            
        }
    });

};

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_REVIEWS:
            return { reviews: action.reviews };
        case CREATE_REVIEW:
            return { ...state, [action.review.id]: action.review}
        default:
            return state;
    };
}
