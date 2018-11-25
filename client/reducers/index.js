import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import shoppingCartReducer from './shoppingCartReducer';
import sizesReducer from './sizesReducer';
import categoriesReducer from './categoriesReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
    products: productsReducer,
    cart: shoppingCartReducer,
    sizes: sizesReducer,
    categories: categoriesReducer,
    auth: authenticationReducer,
});
