/*------------
Main component
-------------*/

import React from 'react';
import axios from 'axios';
import Header from './Header';
import Maps from './Maps';


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
