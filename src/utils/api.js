import { post } from './http';
import { BESTSELLERS_DEPARTMENT, ALL_STORE, STORES_ALL, calculateBestsellers } from './domain';
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Normalize Store Data partly in-place and return normalized data back.
 * @param {Object} storeData API response body.
 * @param {Object} props
 * @return {Object[]}
 */
async function fetchStoresData ({query, rankFirst}) {
	const allstores = Object.keys(STORES_ALL).filter(s => s !== ALL_STORE);
	const body = {is_first_rank: rankFirst};
	if (query) body.query = query;
	const data = await Promise.all(allstores.map(store => fetchProducts({...body, store})));
	const departmentList = allstores.map(store => `${STORES_ALL[store]} ${BESTSELLERS_DEPARTMENT}`)
	const sortedData = data.map((storeData, i) => {
		return {
			data: calculateBestsellers(storeData.data),
			department: departmentList[i]
		}
	});
	return {
		data: sortedData,
		departmentList: departmentList
	};
}

export async function fetchData ({ store, query, rankFirst}) {
	if (store === ALL_STORE) {
		return fetchStoresData({query, rankFirst});
	}
	const body = {
		'store': store,
		'is_first_rank': rankFirst,
	};
	if (query) body.query = query;
	const storeData = await fetchProducts(body);
	return {
		data: storeData.data,
		departmentList: storeData.department_list
	};
}

async function fetchProducts (body = {}) {
	return post(`${API_URL}/products/`, body);
}
