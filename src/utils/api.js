import { post } from './http';
import { BESTSELLERS_DEPARTMENT, ALL_STORE, STORES_ALL, calculateBestsellers } from './domain';
import moment from 'moment';
const API_URL = process.env.REACT_APP_API_URL;
/**
 * Normalize Store Data partly in-place and return normalized data back.
 * @param {Object} storeData API response body.
 * @param {Object} props
 * @return {Object[]}
 */
async function fetchStoresData (params) {
	const allstores = Object.keys(STORES_ALL).filter(s => s !== ALL_STORE);
	const data = await Promise.all(allstores.map(store => fetchProducts(mapParams({...params, store}))));
	const departmentList = allstores.map(store => `${STORES_ALL[store]} ${BESTSELLERS_DEPARTMENT}`)
	const sortedData = data.map((storeData, i) => {
		return {
			data: calculateBestsellers(storeData.data),
			department: departmentList[i],
		}
	});
	return {
		data: sortedData,
		departmentList: departmentList
	};
}

export async function fetchData (params) {
	if (params.shop === ALL_STORE) {
		return fetchStoresData(params);
	}

	const storeData = await fetchProducts(mapParams(params));
	return {
		data: storeData.data,
		departmentList: storeData.department_list
	};
}

async function fetchProducts (body = {}) {
	return post(`${API_URL}/products/`, body);
}

function mapParams (params={}) {
	const body = {
		is_first_rank: params.rankFirst
	};
	if (params.startDate) body.start_date = moment(params.startDate).unix();
	if (params.endDate) body.end_date = moment(params.endDate).unix();
	if (params.query && params.query.length > 0) body.query = params.query;
	if (params.shop) body.store = params.shop;
	return body
}
