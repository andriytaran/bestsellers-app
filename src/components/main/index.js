import React, { Component } from 'react';
import { fetchData } from '../../utils/api';
import Category from './Category';
import Filters from './Filters';
import moment from 'moment';
import {
  ALL_DEPARTMENT,
} from '../../utils/domain';
import {
  Container,
} from 'reactstrap';

const DEFAULT_DEPARTMENT = [{value: ALL_DEPARTMENT, label: 'ALL'}];

class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      filter: {
        shop: 'amazon-women',
        department: DEFAULT_DEPARTMENT,
        query: '',
        startDate: moment().subtract(1, 'weeks'),
        endDate: moment()
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
      const { filter, rankFirst } = this.state;
      const {data, departmentList } = await fetchData({...filter, rankFirst})
        .catch( err => {
          this.setState({
            data: null,
            error: err.toString(),
          });
          throw err;
        });
      this.setState({data, departmentList, error: ''});
    });
  }

  handleFilterChange (options = {}) {
    let newFilter = {...options};
    if (options.name) {
      if (options.name === 'shop') {
        options.department = DEFAULT_DEPARTMENT;
      }
      newFilter = {[options.name]: options.value};
    }
    const callback = options.name !== 'department' ? this.fetchData : null;

    this.setState({
      filter: {
        ...this.state.filter,
        ...newFilter
      }
    }, callback)
  };

  checkViewport() {
    this.setState({
      isMobile: window.innerWidth <= 768
    });
  }

  render () {
    const {data, filter, isMobile, error , departmentList} = this.state;
    let content;
    if (data) {
      if (data.length === 0) {
        content = <h2> Nothing found </h2>
      } else {
        const departments = filter.department.map(d => d.value);
        const categories = (data || []).filter(category => departments.includes(ALL_DEPARTMENT) || departments.includes(category.department));
        content = categories.map( (category, i) => <Category
            key={i}
            category={category}
            shop={filter.shop}
            isMobile={isMobile}
          />)
      }
    } else if (error) {
      content = <h2>Error: {error}</h2>
    } else {
      content = <h2>Loading ... </h2>;
    }

    return (
      <div className="main-body">
        <div className="body-header">
          <h2 className="title"><span>Best Sellers</span></h2>
          <Filters
            onChange={this.handleFilterChange}
            departments={departmentList}
            isMobile={isMobile}
            filter={filter}
            />
        </div>
        <Container fluid>
          {content}
        </Container>
      </div>
    )
  }
}
export default MainPage;
