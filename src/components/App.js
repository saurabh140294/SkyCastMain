import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestPreview from './ContestPreview';
import Weatherapi from './Weatherapi';
import Maps from './Maps';
import Input from './Input';


class App extends React.Component {
  state = {
    pageHeader: 'SkyCast'
  };


  componentDidMount() {
  }


  componentWillUnmount() {
  }


  render() {
    return (
      <div className="container">
      <Header message={this.state.pageHeader} />
      <Maps></Maps>
      </div>
      );
  }
}

export default App;
