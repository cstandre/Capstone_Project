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

export const newReview = (review) => async (dispatch) => {
    const res = await fetch()
}

const initialState = {};

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_REVIEWS:
            return { reviews: action.reviews };
        default:
            return state;
    };
}
