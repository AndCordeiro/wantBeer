import axios from 'axios';

export const baseURL = 'https://api.code-challenge.ze.delivery/public/graphql';

const headers = {
    "content-type": "application/json"
}

const api = axios.create({
    baseURL,
    headers
});

export default api;