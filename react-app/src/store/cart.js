const CART_ITEMS = 'cart/CART_ITEMS';
const ITEM_DETAILS = 'cart/ITEM_DETAILS';
const ITEM_REMOVE = 'cart/ITEM_REMOVE';
const CART_RESET = 'cart/CART_RESET';

const load = (items) => ({
    type: CART_ITEMS,
    items
});

const details = (item) => ({
    type: ITEM_DETAILS,
    item
});

const remove = (item) => ({
    type: ITEM_REMOVE,
    item
});

export const resetCart = () => ({
    type: CART_RESET,
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
    const res = await fetch(`/api/cart/${productId}/${quantity}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        const newItem = await res.json();
        dispatch(details(newItem));
        return newItem;
    };
};

export const updateCartItem = (itemId,  quantity) => async (dispatch) => {
    const res = await fetch(`/api/cart/${itemId}/${quantity}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    });

    if (res.ok) {
        const updatedItem = await res.json();
        dispatch(load(updatedItem));
        return updatedItem;
    };
}

export const deleteItem = (itemId) => async (dispatch) => {
    console.log(itemId, 'in deleted Item thunk')
    const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedItem = await res.json();
        dispatch(remove(deleteItem));
        return deletedItem;
    };
};

const initialState = {};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_ITEMS:
            return { ...state, ...action.items };
        case ITEM_DETAILS:
            return { ...state, [action.item.id]: action.item };
        case ITEM_REMOVE:
            const newState = { ...state };
            delete newState[action.item.id];
            return newState
        case CART_RESET:
            return initialState
        default:
            return state;
    };
};
