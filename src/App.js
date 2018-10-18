import React, { Component } from 'react';
import './App.css';
import {fetchData, range} from './utils/helper.js'

 
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: '',
        rowCount: 0,
        store: 'net-a-porter',
        rankFirst: true,
        error: ''
    }

    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    fetchData.call(this, this.state.store);
  }

  handleStoreChange(event) {
    var value = event.target.value;
    fetchData.call(this, value);
  };

  handleButtonClick() {
    this.setState(state => ({
      rankFirst: !state.rankFirst
    }), () => {
      fetchData.call(this, this.state.store);
    });
  }

  render() {
    const { data, rowCount, store } = this.state;
    let rankNums = range(1, 10);
    let rowNums = range(1, rowCount);

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
                <option value="zara">Zara</option>
                <option value="solid and striped">Solid and Striped</option>
              </select>
            </label>
          </div>
          <button onClick={this.handleButtonClick}>
            {this.state.rankFirst ? 'Show Next 10 Products' : 'Show Prev 10 Products'}
          </button>
        </header>
        {rowNums.length > 0 ? (
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
              {rowNums.map(i => (
                  <tr key={i}>
                    <th className="clip-animation" id={"r" + i} header="blank" key={i}>{data[i-1].department}</th>
                    {range(1, data[i-1].data.length).map(j => (
                      <td key={j} headers={"co" + j + " r" + i}>
                        <div className="product-image">
                            <img src={data[i-1].data[j-1].image} alt={data[i-1].data[j-1].title} /> 
                          <div className="mask"></div>
                        </div>
                        <div className="product-title">
                          <a href={data[i-1].data[j-1].link} target="_blank">{data[i-1].data[j-1].title}</a>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : ('')}
      </div>
    );
  }
}
 
export default App;