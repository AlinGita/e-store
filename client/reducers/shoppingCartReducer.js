import * as TYPES from '../actions/constants/shoppingCartConstants';
import { omit } from 'lodash';

const initial_state = {
    products: {},
    errors: {}
};

export default function reducer(state = initial_state, action) {
    switch(action.type) {
        case TYPES.ADD_PRODUCT: {
            state = {
                ...state,
                products: { ...state.products, [action.payload._id]: action.payload }
            };
            break;
        }
        case TYPES.REMOVE_PRODUCT: {
            state = {
                ...state,
                products: omit(state.products, action.payload)
            };
            break;
        }
        case TYPES.CLEAR_SHOPPING_CART: {
            state = Object.assign({}, initial_state);
            break;
        }
        default: {}
    }
    return state;
}
