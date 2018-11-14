import React, { Component } from 'react';
import { fetchDataByDepartment } from '../../utils/api';
import Category from './Category';
import Filters from './Filters';
import {
  ALL_DEPARTMENT,
} from '../../utils/domain';
import {
  Container,
} from 'reactstrap';

class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      filter: {
        shop: 'amazon-women',
        department: ALL_DEPARTMENT,
        query: ''
      },
      departmentList: [],
      rankFirst: true,
      error: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.checkViewport();
    window.addEventListener("resize", () => this.checkViewport());
  }

  fetchData () {
    this.setState({
      data: null
    }, async () => {
      const { filter: {shop, department, query}, rankFirst } = this.state;
      const {data, departmentList } = await fetchDataByDepartment({ store: shop, department, query, rankFirst })
        .catch( err => {
          this.setState({
            data: null,
            error: err.toString(),
          });
          throw err;
        });
      // debugger
      const newState = {data, error: ''};
      if (departmentList) newState.departmentList = departmentList;
      this.setState(newState);
    });
  }

  handleFilterChange (event) {
    const {name, value} = event.target;
    const options = {[name]: value};
    if (name === 'shop') {
      options.department = ALL_DEPARTMENT;
    }
    this.setState({
      filter: {
        ...this.state.filter,
        ...options
      }
    }, this.fetchData)
  };

  checkViewport() {
    this.setState({
      isMobile: window.innerWidth <= 768
    });
  }

  render () {
    const { data, filter, isMobile, error , departmentList} = this.state;
    let content;
    if (data) {
      content = <Container fluid>
        {data.map( (category, i) => <Category
          key={i}
          category={category}
          shop={filter.shop}
          isMobile={isMobile}

        />)}
      </Container>
    } else if (error) {
      content = <h2>Error: {error}</h2>
    } else {
      content = <h2> Loading . . .</h2>;
    }


    return (
      <div className="main-body">
        <div className="body-header">
          <h2 className="title"><span>Best Sellers</span></h2>
          <Filters
            onChange={this.handleFilterChange}
            departments={departmentList}
            filter={filter}
            />
        </div>
        {content}
      </div>
    )
  }
}
export default MainPage;
