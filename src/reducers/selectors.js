import {
    formatedPicker
} from '../configs/utils';

// Categories
export const categorySelector = (state, isFormated) => state.categories ? formatedPicker(state.categories, isFormated) : [];

// Informations
export const informationsSelector = (state) => state.informations ? state.informations : {};

// Location
export const locationSelector = (state) => state.location ? state.location : {};

// Products
export const productsSelector = (state) => state.products ? state.products : {};