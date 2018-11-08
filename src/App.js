import React, { Component } from 'react';
import './App.css';
import {
  ALL_DEPARTMENT,
  BESTSELLERS_DEPARTMENT,
  ALL_STORE,
  STORES
} from './utils/domain';
import { range } from './utils/helper';
import { fetchDataByDepartment } from './utils/api';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.css';

import {
  Container,
  Row,
  Col
} from 'reactstrap';
import logo from "./Zenabi.Logo.png";


const sliderSettings = ( slidesToShow = 4, slidesToScroll = 4 ) => ({
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow,
  slidesToScroll,
  responsive: [{
    breakpoint: 768,
    slidesToScroll: 1,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }, {
    breakpoint: 900,
    slidesToScroll: 2,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    }
  }]
});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      rowCount: 0,
      store: ALL_STORE,
      department: ALL_DEPARTMENT,
      departmentList: [],
      rankFirst: true,
      rankNums: range(1, 10),
      error: ''
    }

    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.checkViewport();
    window.addEventListener("resize", () => this.checkViewport());
  }

  fetchData(store = this.state.store, department = this.state.department) {
    this.setState({
      data: null,
      rowCount: 0,
      error: '',
      store,
      department,
      ...(store !== this.state.store ? {
        departmentList: []
      } : {})
    }, async () => {
      const { store, departmentList: oldDepartmentList } = this.state;
      const data = await fetchDataByDepartment(store, department, { rankFirst: this.state.rankFirst }).catch(err => {
        this.setState({
          data: null,
          rowCount: 0,
          error: err.toString(),
          store,
          department
        });
        throw err;
      });
      const departmentList = oldDepartmentList.length ? oldDepartmentList : data.map(d => d.department);
      const rowCount = data.length;
      this.setState({
        data,
        rowCount,
        error: '',
        store,
        department,
        departmentList
      });
    });
  }

  handleStoreChange(event) {
    const store = event.target.value;
    this.fetchData(store, ALL_DEPARTMENT);
  };

  handleDepartmentChange(event) {
    const department = event.target.value;
    this.fetchData(this.state.store, department);
  };

  checkViewport() {
    this.setState({
      isMobile: window.innerWidth <= 768
    });
  }

  render() {
    const { data, rowCount, store, department, departmentList, rankNums, isMobile, error } = this.state;
    let rowNums = range(1, rowCount);
    let img_list= []

    if (data && data.length > 0) {
      for (var i = 0; i < rowCount; i++) {
        var temp = '';
        try {
          if (store === ALL_STORE) {
            const path = data[i].department.value.toLowerCase() + '/' + BESTSELLERS_DEPARTMENT + '.png';
            try {
              temp = require('./img/' + path);
            } catch {
              temp = require('./img/best-seller/Best-Seller.png');
            }
          } else if (data[i].department.value === BESTSELLERS_DEPARTMENT) {
            try {
              temp = require('./img/' + store.toLowerCase() + '/' + data[i].department.display + '.png');
            } catch {
              temp = require('./img/best-seller/Best-Seller.png');
            }
          } else {
            temp = require('./img/' + store.toLowerCase() + '/' + data[i].department.display + '.png');
          }
        }
        catch {
          temp = require('./img/no_image.png');
        }
        finally {
          img_list.push(temp)
        }
      }
    }

    return (
      <div className="App">
        <div className="header">
          <div className="logo-img">
            <img id="logo-img" src={logo} alt="react-logo" />
          </div>
        </div>
        <div className="main-body">
          <div className="body-header">
            <h2 className="title"><span>Best Sellers</span></h2>
            <div className="toolbar">
              <label>Store
                <select id="store" onChange={this.handleStoreChange} value={store}>
                  {Object.entries(STORES).map(([value, display]) => (
                    <option value={value} key={value}>{display}</option>
                  ))}
                </select>
              </label>
              <label>Department
                <select id="department" onChange={this.handleDepartmentChange} value={department}>
                  <option value={ALL_DEPARTMENT}></option>
                  {departmentList.map(({ value, display }) => (
                    <option value={value} key={value}>{display}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {data ? (
            <Container fluid>
              {rowNums.map(i => {
                const tiles = range(1, data[i-1].data.length).map(j => (
                  <div key={j} className="personal">
                    <span>{data[i-1].data[j-1].rank}</span>
                    <div className="product-image">
                      <a href={data[i-1].data[j-1].link} target="_blank">
                        <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} />
                      </a>
                    </div>
                    <div className="product-title">
                      <a href={data[i-1].data[j-1].link} target="_blank" style={{'-webkit-box-orient': 'vertical'}}>{data[i-1].data[j-1].title}</a>
                    </div>
                  </div>
                ));

                if ( isMobile ) {
                  tiles.unshift(
                    <div key="ismobile" className="department-area">
                      <img src={img_list[i-1]} />
                      <h2>
                        {data[i-1].department.display}
                      </h2>
                    </div>
                  )
                }

                return (
                  <Row key={i} className="row">
                    <Col md={3} xs={3}>
                      <div className="department-area">
                        <img src={img_list[i-1]} />
                        <h2>
                          {data[i-1].department.display}
                        </h2>
                      </div>

                    </Col>
                    <Col md={9} xs={9}>
                      <div className="product-line">
                        {data[i-1].data.length >= 4 ? (() => {
                          const tiles = range(1, data[i-1].data.length).map(j => (
                            <div className="personal" key={j}>
                              <span>{data[i-1].data[j-1].rank}</span>
                              <div className="product-image">
                                <a href={data[i-1].data[j-1].link} target="_blank">
                                  <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} />
                                </a>
                              </div>
                              <div className="product-title">
                                <a href={data[i-1].data[j-1].link} target="_blank" style={{'-webkit-box-orient': 'vertical'}}>{data[i-1].data[j-1].title}</a>
                              </div>
                            </div>
                          ));

                          if ( isMobile ) {
                            tiles.unshift(
                              <div key="ismobile" className="department-area">
                                <img src={img_list[i-1]} />
                                <h2>
                                  {data[i-1].department.display}
                                </h2>
                              </div>
                            )
                          }

                          return data[i-1].department.value !== BESTSELLERS_DEPARTMENT ? (
                            <div className="product-area">
                             <Slider {...sliderSettings()} key={`${this.state.store}__${data[i-1].department.value}`}>
                                  {tiles}
                              </Slider>
                            </div>
                          ) : (
                           <div className="product-grid">{tiles}</div>
                          );
                        })() : (
                          <div className="product-area less" style={{width: `calc(100% / 4 * ${data[i-1].data.length})`, borderRight: '1px solid #d3d7de'}}>
                            <Slider {...sliderSettings(data[i-1].data.length, data[i-1].data.length)}>
                              {tiles}
                            </Slider>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                )})}
            </Container>
          ) : (
            <h2>Loading . . .</h2>
          )}
          {error && <h2>Error: {error}</h2>}
        </div>
      </div>
    );
  }
}

export default App;
