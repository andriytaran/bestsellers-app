import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
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
