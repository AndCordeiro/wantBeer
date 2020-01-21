import {
    INFORMATIONS
} from '../actions/types';

export default informations = (state = { loading: false }, action) => {
    switch (action.type) {
        case INFORMATIONS:
            return action.payload
        default:
            return state;
    }
}