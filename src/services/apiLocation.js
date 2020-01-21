import axios from 'axios';

export const baseURL = 'https://maps.googleapis.com/maps/api/geocode/';

const headers = {
    "content-type": "application/json"
}

const apiLocation = axios.create({
    baseURL,
    headers
});

export default apiLocation;