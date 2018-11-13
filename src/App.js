import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainPage from './components/main';
import Header from './components/shared/Header';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <MainPage />
      </div>
    );
  }
}

export default App;
