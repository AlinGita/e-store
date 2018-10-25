import * as TYPES from './constants/shoppingCartConstants';

export const addProduct = (product) => ({
    type: TYPES.ADD_PRODUCT,
    payload: product
});
export const removeProduct = (productId) => ({
    type: TYPES.REMOVE_PRODUCT,
    payload: productId
});
export const clearShoppingCart = () => ({
    type: TYPES.CLEAR_SHOPPING_CART
});
export const openShoppingCart = (open) => ({
    type: TYPES.OPEN_SHOPPING_CART,
    payload: open
});
