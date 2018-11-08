import * as R from 'ramda';

export const ALL_DEPARTMENT = '_all';
export const BESTSELLERS_DEPARTMENT = 'Best sellers';
export const ALL_STORE = '_all';

export const STORES = {
	'_all': 'All',
	'amazon': 'Amazon',
	'amazon-women': 'Amazon-Women',
	'amazon-fashion': 'Amazon-Fashion',
	'net-a-porter-all': 'Net-A-Porter',
	'revolve': 'Revolve',
	'shopbop': 'Shopbop',
	'farfetch-all': 'FarFetch',
	'moda-operandi': 'Moda-Operandi',
	'zara': 'Zara'
	// 'solid and striped': 'Solid and Striped',
};

export function calculateBestsellers (productsByDepartment) {
    const flatten = R.compose(
        R.flatten,
        R.map(datum => datum.data)
    );
    const sortByRank = R.sortBy(d => -d.rank);
    const top10 = R.take(10);

    return R.compose(
        top10,
        sortByRank,
        flatten
    )(productsByDepartment);
}
