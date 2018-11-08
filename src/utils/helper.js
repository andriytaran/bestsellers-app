import axios from 'axios';
import * as R from 'ramda';

const API_URL = "https://backend-dot-zenabi-bestsellers.appspot.com";
// const API_URL = "http://localhost:8090";

function getBestsellers (data) {
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
    )(data);
}

const stores = [
    "amazon",
    "amazon-women",
    "amazon-fashion",
    "net-a-porter-all",
    "revolve",
    "shopbop",
    "farfetch",
    "moda-operandi",
    "zara"
    // "solid and striped"
];

const names = [
    "Amazon",
    "Amazon-Women",
    "Amazon-Fashion",
    "Net-A-Porter",
    "Revolve",
    "Shopbop",
    "FarFetch",
    "Moda-Operandi",
    "Zara"
    // "Solid and Striped"
];

async function _fetchData(value, rankFirst) {
    if (value === '_all') {
        const alldata = await Promise.all(stores.map(store => _fetchData.call(this, store, rankFirst))).catch(error => console.log(error.response));
        const departmentList = names.map((name, i) => ({
            display: name + ' Bestsellers',
            value: stores[i]
        }));
        const bestsellers = alldata.map((data, i) => ({
            ...data.data[0],
            department: departmentList[i].display
        }));
        const rowCount = bestsellers.length;
        return { data: bestsellers, rowCount, departmentList };
    } else {
        var bodyFormData = new FormData();
        bodyFormData.append('store', value);
        bodyFormData.append('is_first_rank', rankFirst);

        const res = await axios.post(`${API_URL}/products/`, bodyFormData).catch(error => console.log(error.response));

        const data = res.data.data;
        const rowCount = res.data.row_count;
        const departmentList = res.data.department_list;

        data.unshift({
            department: 'Bestsellers',
            data: getBestsellers(data)
        });
        departmentList.unshift('Bestsellers');

        return { data: data, rowCount: rowCount + 1, departmentList: departmentList };
    }
}

export async function fetchData(value) {
    this.setState({ store: value, departmentList: [] });
    const data = await _fetchData(value, this.state.rankFirst);
    this.setState(data);
}

export async function fetchDataByDepartment(value) {
    if (value === 'Bestsellers') {
        this.setState({ departmentSelect: value });
        const res = await _fetchData(this.state.store, this.state.rankFirst);
        this.setState({ data: [res.data[0]], rowCount: 1, departmentList: res.departmentList });
    } else {
        var bodyFormData = new FormData();
        this.setState(
            { departmentSelect: value },
            () => {
                bodyFormData.append('store', this.state.store);
                bodyFormData.append('department', this.state.departmentSelect);
                bodyFormData.append('is_first_rank', this.state.rankFirst);
            }
        );
        axios.post(`${API_URL}/products-department/`, bodyFormData)
            .then(res => {
            const data = res.data.data;
            const rowCount = res.data.row_count;
            this.setState({ data: data, rowCount: rowCount });
            })
            .catch(error => {
            console.log(error.response)
        });
    }
}

export function range(start, end) {
    let nums = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
}
