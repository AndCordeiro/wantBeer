import {
    CATEGORIES
} from '../actions/types';

export default categories = (state = [], action) => {
    switch (action.type) {
        case CATEGORIES:
            return action.payload
        default:
            return state;
    }
}