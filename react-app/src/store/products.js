const GET_PRODUCTS = 'products/GET_PRODUCTS';
const DETAILS_PRODUCTS = 'products/DETAILS_PRODUCTS';
const DELETE_PRODUCTS = 'products/DELETE_PRODUCTS';
const ADD_IMG = 'products/ADD_IMG';

const load = (products) => ({
    type: GET_PRODUCTS,
    products
});

const details = (product) => ({
    type: DETAILS_PRODUCTS,
    product
});

const remove = (productId) => ({
    type: DELETE_PRODUCTS,
    productId
});

const addImg = (image) => ({
    type: ADD_IMG,
    image
})

export const loadProducts = () => async (dispatch) => {
    const res = await fetch('/api/products');

    if (res.ok) {
        const products = await res.json();
        dispatch(load(products));
        return products;
    };
};

export const userProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/current');

    if (res.ok) {
        const products = await res.json();
        dispatch(load(products));
        return products;
    };
};

export const productDetails = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`);

    if (res.ok) {
        const product = await res.json();
        dispatch(load(product));
        return product
    };
};

export const createProductFetch = (product) => async (dispatch) => {
    const { product_name, price, brand, stock_quantity, description } = product

    const res = await fetch('/api/products/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_name,
            price,
            brand,
            stock_quantity,
            description
        })
    });

    if (res.ok) {
        const newProduct = await res.json();
        dispatch(details(newProduct));
        return newProduct;
    }
};

export const editProduct = (product) => async (dispatch) => {
    const { id, product_name, price, brand, stock_quantity, description } = product

    const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            product_name,
            price,
            brand,
            stock_quantity,
            description
        })
    });

    if (res.ok) {
        const product = await res.json();
        dispatch(details(product));
        return product;
    };
};

export const deleteProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const product = await res.json();
        dispatch(remove(productId));
        return product
    };
};

export const addProductImg = (productId, formData) => async (dispatch) => {

    const res = await fetch(`/api/products/${productId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
    });
    // console.log(formData, "form data in the thunk")

    if (res.ok) {
        const new_image = await res.json();
        dispatch(addImg(new_image));
        return new_image;
    };
};

const initialState = {};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, ...action.products};
        case DETAILS_PRODUCTS:
            return { ...state, [action.product.id]: action.product};
        case DELETE_PRODUCTS:
            const newState = { ...state };
            delete newState[action.productId];
            return newState
        case ADD_IMG:
            return {
                ...state,
                [action.image.id]: { ...state[action.image.id]
                }
            }
        default:
            return state
    }
}
