const LOAD_SEARCH = 'search/LOAD_SEARCH';

const load = (search) => ({
    type: LOAD_SEARCH,
    search
});

export const search = (input) => async (dispatch) => {
    const res = await fetch('/api/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: input })
    });

    if (res.ok) {
        const searched = await res.json();
        dispatch(load(searched));
        return searched
    };
};

const initialState = {};

export default function searchedReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_SEARCH:
            return { ...state, ...action.search }
        default:
            return state
    };
};
