import {
    ADD_CATEGORIES
} from '../actions/types';

export default category = (state = [], action) => {
    switch (action.type) {
        case ADD_CATEGORIES:
            return [action.payload]
        default:
            return state;
    }
}