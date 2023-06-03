const CART_ITEMS = 'cart/CART_ITEMS';
const CART_DETAILS = 'cart/CART_DETAILS';

const load = (items) => ({
    type: CART_ITEMS,
    items
});

const details = (item) => ({
    type: CART_DETAILS,
    item
});

export const loadItems = () => async (dispatch) => {
    const res = await fetch('/api/cart');

    if (res.ok) {
        const items = await res.json();
        // console.log(items)
        dispatch(load(items));
        return items;
    };
};

export const addItem = (productId, quantity) => async (dispatch) => {
    const res = await fetch (`/api/cart/${productId}/${quantity}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        const newItem = await res.json();
        dispatch(details(newItem));
        return newItem;
    };
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_ITEMS:
            return { ...state, ...action.items };
        case CART_DETAILS:
            return { ...state, [action.item.id]: action.item };
        default:
            return state;
    };
};
