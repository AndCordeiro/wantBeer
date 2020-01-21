import {
    PRODUCTS
} from '../actions/types';

export default products = (state = { loading: false }, action) => {
    switch (action.type) {
        case PRODUCTS:
            return action.payload
        default:
            return state;
    }
}