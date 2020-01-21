import api from '../services/apiLocation';
import {
    LOCATION
} from './types';

export const getLocation = (address) => (dispatch) => new Promise((resolve, reject) => {
    dispatch({
        type: LOCATION,
        payload: {
            location,
            loading: true
        }
    });
    api.get(`json?address=${address}&key=${global.GOOGLE_KEY}`)
        .then((response) => response.data)
        .then(({ results }) => results[0])
        .then(({ geometry }) => geometry.location)
        .then((location) => {
            if (location) {
                dispatch({
                    type: LOCATION,
                    payload: {
                        location,
                        loading: false
                    }
                });
                resolve(location);
            } else {
                dispatch({
                    type: LOCATION,
                    payload: {
                        loading: false
                    }
                });
                reject();
            }
        })
        .catch(reject);
});