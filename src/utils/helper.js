import axios from 'axios';


export function fetchData(value) {
    var bodyFormData = new FormData();
    this.setState(
        { store: value },
        () => {
            bodyFormData.append('store', this.state.store);
            bodyFormData.append('is_first_rank', this.state.rankFirst);
        }
        );
    // axios.post(`https://backend-dot-zenabi-bestsellers.appspot.com/products/`, bodyFormData)
    axios.post(`http://localhost:8000/products/`, bodyFormData)
        .then(res => {
        const data = res.data.data;
        const rowCount = res.data.row_count;
        const departmentList = res.data.department_list;
        this.setState({ data: data, rowCount: rowCount, departmentList: departmentList });
        })
        .catch(error => {
        console.log(error.response);                                                                                              
    });
}

export function fetchDataByDepartment(value) {
    var bodyFormData = new FormData();
    this.setState(
        { departmentSelect: value },
        () => {
            bodyFormData.append('store', this.state.store);
            bodyFormData.append('department', this.state.departmentSelect);
            bodyFormData.append('is_first_rank', this.state.rankFirst);
        }
    );
    // axios.post(`https://backend-dot-zenabi-bestsellers.appspot.com/products/`, bodyFormData)
    axios.post(`http://localhost:8000/products-department/`, bodyFormData)
        .then(res => {
        const data = res.data.data;
        const rowCount = res.data.row_count;
        this.setState({ data: data, rowCount: rowCount });
        })
        .catch(error => {
        console.log(error.response)
    });
}

export function range(start, end) {
    let nums = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
}