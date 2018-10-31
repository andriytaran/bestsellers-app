import React, { Component } from 'react';
import './App.css';
import {fetchData, range} from './utils/helper.js'
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.css';

import {
  Container,
  Row,
  Col
} from "reactstrap";
import logo from "./Zenabi.Logo.png";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: '',
        rowCount: 0,
        store: 'net-a-porter',
        rankFirst: true,
        rankNums: range(1, 10),
        error: ''
    }

    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  componentDidMount() {
    fetchData.call(this, this.state.store);
  }

  handleStoreChange(event) {
    var value = event.target.value;
    fetchData.call(this, value);
  };

  render() {
    const { data, rowCount, store, rankNums } = this.state;
    let rowNums = range(1, rowCount);
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    let img_list= []

    if (data.length > 0) {
      for (var i = 0; i < rowCount; i++) {
        try {
          var temp = require('./img/' + store.toLowerCase() + '/' + data[i].department + '.png');
        }
        catch {
          var temp = require('./img/no_image.png');
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
                  <option value="net-a-porter">Net-A-Porter</option>
                  <option value="revolve">Revolve</option>
                  <option value="shopbop">Shopbop</option>
                  <option value="farfetch">FarFetch</option>
                  <option value="moda-operandi">Moda-Operandi</option>
                  <option value="zara">Zara</option>
                  <option value="solid and striped">Solid and Striped</option>
                </select>
              </label>
              {/* <input type="search" id="search" placeholder="Search.." /> */}
            </div>
          </div>
          {data ? (
            <Container fluid>
              {rowNums.map(i => (
                <Row className="row">
                  <Col md={3} xs={3}>
                  {data[i-1].department ? (
                    <div className="department-area">
                      <img src={img_list[i-1]} />
                      <h2>
                        {data[i-1].department}
                      </h2>
                      {/* <a href="#">View all</a> */}
                    </div>
                  ) : (
                    <div className="department-area">
                      <img src={require('./img/best-seller/Best-Seller.png')} />
                      <h2>
                        Best Sellers
                      </h2>
                      {/* <a href="#">View all</a> */}
                    </div>
                  )}
                    
                  </Col>
                  <Col md={9} xs={9} className="product-line">
                    <div className="product-area">
                      {/* <Slider {...settings}> */}
                      {data[i-1].data.length >= 4 ?(
                        <Slider dots={false} infinite={true} speed={1000} slidesToShow={4} slidesToScroll={4} >
                          {range(1, data[i-1].data.length).map(j => (
                            <div className="personal">
                                <p>{data[i-1].data[j-1].rank}</p>
                              <div className="product-image">
                                <a href={data[i-1].data[j-1].link} target="_blank">
                                  <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} /> 
                                </a>
                              </div>
                              <div className="product-title">
                                <a href={data[i-1].data[j-1].link} target="_blank">{data[i-1].data[j-1].title}</a>
                              </div>
                            </div>
                          ))}
                      </Slider>
                      ) : (
                        <Slider dots={false} infinite={true} speed={1000} slidesToShow={data[i-1].data.length} slidesToScroll={data[i-1].data.length} >
                          {range(1, data[i-1].data.length).map(j => (
                            <div className="personal">
                              <div className="product-image">
                                <a href={data[i-1].data[j-1].link} target="_blank">
                                  <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} /> 
                                </a>
                              </div>
                              <div className="product-title">
                                <a href={data[i-1].data[j-1].link} target="_blank">{data[i-1].data[j-1].title}</a>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </Col>
                </Row>
              ))}
            </Container>
          ) : (
            <h2>No data available!</h2>
          )}
        </div>
      </div>
    );
  }
}
 
export default App;
