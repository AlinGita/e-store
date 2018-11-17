import * as TYPES from 'actions/constants/shoppingCartConstants';
import { omit } from 'lodash';

const initial_state = {
    products: {},
    errors: {},
    closed: true,
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
        case TYPES.OPEN_SHOPPING_CART: {
            state = { ...state, closed: !action.payload };
            break;
        }
        case TYPES.CHANGE_PRODUCT_AMOUNT: {
            const { productId, amount } = action.payload;
            state = {
                ...state,
                products: {
                    ...state.products,
                    [productId]: {
                        ...state.products[productId],
                        amount: parseInt(amount)
                    }
                }
            };
            break;
        }
        default: {}
    }
    return state;
}
