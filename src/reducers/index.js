import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import location from './location';
import informations from './informations';

const rootReducer = combineReducers({
    products,
    categories,
    location,
    informations
});

export default rootReducer;