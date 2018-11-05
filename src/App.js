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
        data: '',
        rowCount: 0,
        store: 'amazon-women',
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
                  <option value="amazon-women">Amazon-Women</option>
                  <option value="amazon">Amazon-Fashion</option>
                  <option value="net-a-porter">Net-A-Porter</option>
                  <option value="revolve">Revolve</option>
                  <option value="shopbop">Shopbop</option>
                  <option value="farfetch">FarFetch</option>
                  <option value="moda-operandi">Moda-Operandi</option>
                </select>
              </label>
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
                    </div>
                  ) : (
                    <div className="department-area">
                      <img src={require('./img/best-seller/Best-Seller.png')} />
                      <h2>
                        Best Sellers
                      </h2>
                    </div>
                  )}
                    
                  </Col>
                  <Col md={9} xs={9}>
                    <>
                     <h2>{data[i-1].department}</h2>
               
                     <div className="product-line">
                      
                      {data[i-1].data.length >= 4 ?(

                        <div className="product-area">
                          <Slider {...sliderSettings()}>
                            {range(1, data[i-1].data.length).map(j => (
                              <div className="personal">
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
                            ))}
                        </Slider>
                      </div>
                        ) : (
                          <div className="product-area less" style={{width: `calc(100% / 4 * ${data[i-1].data.length})`, borderRight: '1px solid #d3d7de'}}>
                           <Slider {...sliderSettings(data[i-1].data.length, data[i-1].data.length)}>
                              {range(1, data[i-1].data.length).map(j => (
                                <div className="personal">
                                <span>{data[i-1].data[j-1].rank}</span>
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
                          </div>
                        )}
                     </div>
                    </>
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
