import * as R from 'ramda';

export const ALL_DEPARTMENT = '_all';
export const BESTSELLERS_DEPARTMENT = 'Best sellers';
export const ALL_STORE = '_all';

export const STORES = {
	'_all': 'All',
	'amazon': 'Amazon',
	'amazon-women': 'Amazon-Women',
	'amazon-fashion': 'Amazon-Fashion',
	'net-a-porter': 'Net-A-Porter',
	'revolve': 'Revolve',
	'shopbop': 'Shopbop',
	'farfetch': 'FarFetch',
	'moda-operandi': 'Moda-Operandi',
	'zara': 'Zara'
	// 'solid and striped': 'Solid and Striped',
};

/**
 * Stores to display on the "All" page.
 */
export const STORES_ALL = {
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
	const mapIndexed = R.addIndex(R.map);
	const enumerateRank = mapIndexed((p, i) => ({
		...p,
		rank: i
	}));

    return R.compose(
		enumerateRank,
        top10,
        sortByRank,
        flatten
    )(productsByDepartment);
}
