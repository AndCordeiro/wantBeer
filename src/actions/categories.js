import api from '../services/api';


export const getCategories = () => new Promise((resolve, reject) => {
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
            if (data.data) {
                resolve(data.data);
            } else {
                reject(new Error(data.errors[0]));
            }
        })
        .catch(reject);
});