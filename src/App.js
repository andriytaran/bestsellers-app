import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import './App.css';
// import post from './api.js';

import axios from 'axios';
import Slider from "react-slick";


 
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: '',
        rowCount: 0,
        store: 'net-a-porter',
        error: ''
    }

    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  componentDidMount() {
    var bodyFormData = new FormData();
    bodyFormData.append('store', this.state.store);
    axios.post(`http://127.0.0.1:8000/products/`, bodyFormData)
      .then(res => {
        const data = res.data.data;
        const rowCount = res.data.row_count;
        this.setState({ data: data, rowCount: rowCount });
      })
      .catch(error => {
        console.log(error.response)
    });
    // return post('http://127.0.0.1:8000/products/', bodyFormData);


  }

  handleStoreChange(event) {
    var value = event.target.value;
    this.setState({ store: value });
    var bodyFormData = new FormData();
    bodyFormData.append('store', value);
    axios.post(`http://127.0.0.1:8000/products/`, bodyFormData)
      .then(res => {
        const data = res.data.data;
        const rowCount = res.data.row_count;
        this.setState({ data: data, rowCount: rowCount });
      })
      .catch(error => {
        console.log(error.response)
    });
  };

  render() {
    const { data, rowCount, store } = this.state;
    let rankNums = range(1, 10);
    let rowNums = range(1, rowCount);
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2
    };

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Best Sellers
          </p>
          <div>
            <label>Store 
              <select id="store" onChange={this.handleStoreChange} value={store}>
                <option value="net-a-porter">Net-A-Porter</option>
                <option value="revolve">Revolve</option>
                <option value="shopbop">Shopbop</option>
                <option value="farfetch">FarFetch</option>
                <option value="moda-operandi">Moda-Operandi</option>
              </select>
            </label>
          </div>
        </header>
        <table id="product-table">
          <thead>
            <tr>
              <th id="blank">&nbsp;</th>
              {rankNums.map(i => (
                <th id={"co" + i} headers="blank" key={i}>{i}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {rowNums.length > 0 ? (
              rowNums.map(i => (
                <tr>
                  <th className="clip-animation" id={"r" + i} header="blank" key={i}>{data[i-1].department}</th>
                  {range(1, data[i-1].data.length).map(j => (
                    <td headers={"co" + j + " r" + i}>
                      <div className="product-image">
                        <a href="#" title="Full Image">
                          <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} /> 
                        </a>
                        <div className="mask"></div>
                      </div>
                      <div className="product-title">
                        <a href={data[i-1].data[j-1].link}>{data[i-1].data[j-1].title}</a>
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
          
        </table>
      </div>
    );
  }
}
 
export default App;

function range(start, end) {
  let nums = [];
  if (end > 10) { end =10; }
  for (let i = start; i <= end; i++) nums.push(i);
  return nums;
}