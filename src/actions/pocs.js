import api from '../services/api';
import {
	INFORMATIONS,
	PRODUCTS
} from './types';
import moment from 'moment';


export const getPocsSearch = (lat, long) => (dispatch) => new Promise((resolve, reject) => {
	dispatch({
		type: INFORMATIONS,
		payload: {
			message: null,
			loading: true
		}
	});
	api.post(`/public/graphql`, {
		query: `
			query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
				pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
				__typename
				id
				status
				tradingName
				officialName
				deliveryTypes {
					__typename
					pocDeliveryTypeId
					deliveryTypeId
					price
					title
					subtitle
					active
				}
				paymentMethods {
					__typename
					pocPaymentMethodId
					paymentMethodId
					active
					title
					subtitle
				}
				pocWorkDay {
					__typename
					weekDay
					active
					workingInterval {
					__typename
					openingTime
					closingTime
					}
				}
				address {
					__typename
					address1
					address2
					number
					city
					province
					zip
					coordinates
				}
				phone {
					__typename
					phoneNumber
				}
				}
			}
		`,
		variables: {
			"algorithm": "NEAREST",
			lat,
			long,
			"now": moment().format("YYYY-MM-DD HH:mm:ss")
		}
	})
		.then((response) => response.data)
		.then((response) => response.data)
		.then((response) => response.pocSearch)
		.then(([data]) => {
			let informations = null;
			let message = null;
			if (data) {
				informations = data;
			} else {
				message = "Owwwnnn, it's outside our area!";
			}
			dispatch({
				type: INFORMATIONS,
				payload: {
					informations,
					message,
					loading: false
				}
			});
			resolve();
		})
		.catch((error) => {
			dispatch({
				type: INFORMATIONS,
				payload: {
					informations,
					message: error.message,
					loading: false
				}
			});
			reject();
		});
});

export const getPoc = (id, categoryId = null) => (dispatch) => new Promise((resolve, reject) => {
	dispatch({
		type: PRODUCTS,
		payload: {
			poc: { id, products: [] },
			loading: true
		}
	});
	api.post(`/public/graphql`, {
		query: `
			query poc($id: ID!, $categoryId: Int, $search: String){
				poc(id: $id) {
				id
				products(categoryId: $categoryId, search: $search) {
					id
					title
					rgb
					images {
					url
					}
					productVariants {
					availableDate
					productVariantId
					price
					inventoryItemId
					shortDescription
					title
					published
					volume
					volumeUnit
					description
					subtitle
					components {
						id
						productVariantId
						productVariant {
						id
						title
						description
						shortDescription
						}
					}
					}
				}
				}
			}
      	`,
		variables: {
			id,
			"search": "",
			"categoryId": categoryId != null ? parseInt(categoryId) : categoryId
		}
	})
		.then((response) => response.data)
		.then((response) => response.data)
		.then(({ poc }) => {
			if (poc) {
				dispatch({
					type: PRODUCTS,
					payload: {
						poc,
						loading: false
					}
				});
				resolve();
			} else {
				dispatch({
					type: PRODUCTS,
					payload: {
						poc: { id, products: [] },
						loading: false
					}
				});
				reject();
			}
		})
		.catch(reject);
});