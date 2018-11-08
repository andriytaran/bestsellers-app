import * as R from 'ramda';
import { post } from './http';

import { BESTSELLERS_DEPARTMENT, ALL_STORE, STORES, calculateBestsellers, ALL_DEPARTMENT } from './domain';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Normalize Store Data partly in-place and return normalized data back.
 * @param {Object} storeData API response body.
 * @return {Object[]}
 */
function normalizeStoreData (storeData, calculateBestSellers = true) {
	const productsByDepartment = storeData.data;
	if (productsByDepartment.length === 0) return [];

	// put bestsellers on top
	const index = R.findIndex(d => d.department === '', productsByDepartment);
	if (~index) {
		if (index === 0) {
			productsByDepartment[index].department = BESTSELLERS_DEPARTMENT;
		} else {
			const bestsellers = productsByDepartment.splice(index, 1);
			bestsellers.department = BESTSELLERS_DEPARTMENT;
			productsByDepartment.unshift(bestsellers);
		}
	} else {
		if (calculateBestSellers) {
			// calculate bestsellers by max rank if its not present in the list of departments
			const bestsellers = {
				data: calculateBestsellers(productsByDepartment),
				department: BESTSELLERS_DEPARTMENT
			};
			productsByDepartment.unshift(bestsellers);
		}
	}

	return productsByDepartment.map(d => ({
		data: [],
		...d,
		department: {
			value: d.department,
			display: d.department
		}
	}));
}

export async function fetchDataByStore (store, { rankFirst }) {
	if (store === ALL_STORE) {
		const allstores = Object.keys(STORES).filter(s => s !== ALL_STORE);
		const alldata = await Promise.all(allstores.map(store => fetchDataByStore(store, { rankFirst })));
		return alldata.map((ps, i) => ({
			data: [],
			...ps[0],
			department: {
				value: allstores[i],
				display: STORES[allstores[i]] + ' ' + BESTSELLERS_DEPARTMENT
			}
		}));
	}

	const storeData = await post(`${API_URL}/products/`, {
		'store': store,
		'is_first_rank': rankFirst
	});
	return normalizeStoreData(storeData);
}

export async function fetchDataByDepartment (store, department, { rankFirst }) {
	if (department === ALL_DEPARTMENT) {
		return fetchDataByStore(store, { rankFirst });
	}

	if (department === BESTSELLERS_DEPARTMENT) {
		const productsByDepartment = await fetchDataByStore(store, { rankFirst });
		if (productsByDepartment.length) {
			return [productsByDepartment[0]];
		} else {
			return [];
		}
	}

	if (store === ALL_STORE) {
		return fetchDataByDepartment(department, BESTSELLERS_DEPARTMENT, { rankFirst });
	}

	const storeData = await post(`${API_URL}/products-department/`, {
		'store': store,
		'department': department,
		'is_first_rank': rankFirst
	});

	return normalizeStoreData(storeData, false);
}
