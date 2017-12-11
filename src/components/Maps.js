import React from 'react';
var axios = require('axios');
import Weatherapi from './Weatherapi';
import cookie from 'react-cookies';


class Maps extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      textbox:'',
      cookies:[],
      id1:'',
      id2:'',
      id3:'',
      id4:'',
      id5:'',
      i: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentWillMount() { 
    this.setState({
      id1: cookie.load('userId1'),
      id2: cookie.load('userId2'),
      id3: cookie.load('userId3'),
      id4: cookie.load('userId4'),
      id5: cookie.load('userId5')
    });
  }

  handleChange(event) {
    this.setState({textbox: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.i > 5)
    {
      this.state.cookies.splice(0,1,this.state.textbox);
    }
    else
    {
      this.state.cookies.push(this.state.textbox);
    }
    if(this.state.i > 5)
    {
      this.state.i = 1;
    }
    cookie.save('userId'+this.state.i, this.state.textbox);

    this.state.i = this.state.i + 1;
    let key = process.env.MAPS_KEY;
    console.log(key);
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+this.state.textbox+"&key="+key)
    .then((resp)=>{
      this.setState({
        lat: resp.data.results[0].geometry.location.lat,
        lng: resp.data.results[0].geometry.location.lng,
        id1: cookie.load('userId1'),
        id2: cookie.load('userId2'),
        id3: cookie.load('userId3'),
        id4: cookie.load('userId4'),
        id5: cookie.load('userId5')
      });
    });
    event.preventDefault();
  }
  


  render() {
    let temp;
    if(this.state.lat!='' && this.state.lng!='') {
      temp = <Weatherapi lat={this.state.lat} lng={this.state.lng}></Weatherapi>
    } else {
      temp = null
    }
    return (
      <div className= "nopad">
        <div className="row marginspan">
          <div className="col"><span>Recent Searches - </span></div>
          <div className="col x">{this.state.id1}</div>
          <div className="col x">{this.state.id2}</div>
          <div className="col x">{this.state.id3}</div>
          <div className="col x">{this.state.id4}</div>
          <div className="col x">{this.state.id5}</div>
        </div>
        <div className="row marginspan x marginleft">
          <form className="inputwidth" onSubmit={this.handleSubmit}>      
            <div className="input-group">
              <input type="text" value={this.state.textbox} onChange={this.handleChange} className="form-control" placeholder="Search for your location..." />
            </div>
          </form>
        </div>
        {this.state.lat && this.state.lng && <Weatherapi lat={this.state.lat} lng={this.state.lng}></Weatherapi>}
      </div>
      );
  }
}

export default Maps;
