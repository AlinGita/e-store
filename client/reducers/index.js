import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import shoppingCartReducer from './shoppingCartReducer';
import sizesReducer from './sizesReducer';

export default combineReducers({
    products: productsReducer,
    cart: shoppingCartReducer,
    sizes: sizesReducer,
});
