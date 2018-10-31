import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import shoppingCartReducer from './shoppingCartReducer';
import sizesReducer from './sizesReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
    products: productsReducer,
    cart: shoppingCartReducer,
    sizes: sizesReducer,
    categories: categoriesReducer,
});
