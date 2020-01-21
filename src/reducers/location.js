import {
    LOCATION
} from '../actions/types';

export default location = (state = { loading: false }, action) => {
    switch (action.type) {
        case LOCATION:
            return action.payload
        default:
            return state;
    }
}