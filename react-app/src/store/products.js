const GET_PRODUCTS = 'products/GET_PRODUCTS'
const DETAILS_PRODUCTS = 'products/DETAILS_PRODUCTS'
const DELETE_PRODUCTS = 'products/DELETE_PRODUCTS'

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
        products = await res.json();
        dispatch(load(products));
        return products;
    };
};

export const productDetails = (productId) => async (dispatch) => {
    const res = await fetch(`/api/${productId}`);

    if (res.ok) {
        const product = await res.json();
        dispatch(details(product));
        return product
    };
};

export const createProduct = (product) => async (dispatch) => {
    const { product_name, price, brand, stock_quantity, description } = product

    const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_name,
            price,
            brand,
            stock_quantity,
            description
        })
    });

    const newProduct = await res.json();
    if (res.ok) {
        dispatch(details(newProduct));
        return newProduct;
    }
};

export const editProduct = (product) => async (dispatch) => {
    { id, product_name, price, brand, stock_quantity, description } = product

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
    const res = await fetach(`/api/products/${productId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const product = await res.json();
        dispatch(remove(productId));
        return product
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
        default:
            return state
    }
}
