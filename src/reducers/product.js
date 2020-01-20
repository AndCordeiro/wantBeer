import {
    ADD_PRODUCTS
} from '../actions/types';

export default product = (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return [action.payload]
        default:
            return state;
    }
}