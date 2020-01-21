import api from '../services/api';
import {
    CATEGORIES
} from './types';

export const getCategories = () => (dispatch) => {
    api.post(`/public/graphql`, {
        query: `
            query allCategoriesSearch {
                allCategory {
                    title
                    id
                }
            }
        `
    })
        .then((response) => response.data)
        .then((data) => {
            let { allCategory } = data.data;
            if (allCategory) {
                dispatch({
                    type: CATEGORIES,
                    payload: allCategory
                });
            }
        })
        .catch();
};