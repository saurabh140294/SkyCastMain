/*------------------------------------------
Calls the Weather API and extracts the values 
to display the current weather and hourly and 
weekly forecast.
-------------------------------------------*/


import React from 'react';
import api from '../../api';
import Maps from './Maps';
import Weekforecast from './Weekforecast';
import Skycons from 'react-skycons';
import Weatherhistory from './Weatherhistory';
import LineExample from './LineExample';
var axios = require('axios');


class Weatherapi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      summary: '',
      time: '',
      icon: '',
      hourly: [],
      daily: []
    };
  }


  componentWillMount(){
    let lat = this.props.lat; 
    let lng = this.props.lng;

    axios.get("/getweather?latitude="+lat+"&longitude="+lng)
    .then((resp)=>{

      resp.data.hourly.data.map((a)=> {
        let t = new Date(a.time * 1000);
        a.time = t.getHours();
      });
      resp.data.daily.data.map((a)=> {
        let t = new Date(a.time * 1000);
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var n = weekday[t.getDay()];

        a.time = n;
      });
      this.setState({
        temperature: resp.data.currently.temperature,
        summary: resp.data.currently.summary,
        time: resp.data.currently.time,
        icon: resp.data.currently.icon,
        hourly: resp.data.hourly.data,
        daily: resp.data.daily.data
      });
    });
  }


  componentWillReceiveProps(nextProps) {  
    if(nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng ){
      let lat = nextProps.lat; 
      let lng = nextProps.lng;
      axios.get("/getweather?latitude="+lat+"&longitude="+lng)
      .then((resp)=>{
        resp.data.hourly.data.map((a)=> {
          let t = new Date(a.time * 1000);
          a.time = t.getHours();
        });
        resp.data.daily.data.map((a)=> {
          let t = new Date(a.time * 1000);
          var weekday = new Array(7);
          weekday[0] =  "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";
          var n = weekday[t.getDay()];
          a.time = n;
        });
        this.setState({
          temperature: resp.data.currently.temperature,
          summary: resp.data.currently.summary,
          icon: resp.data.currently.icon,
          hourly: resp.data.hourly.data,
          daily: resp.data.daily.data
        });
      });
    }
  }


  componentWillUnmount() {
  }
  

  render() {

    return (
      <div className="container-fluid">
        <h5 className="x">Today</h5>
        <div className="row marginweek">
          <div className="col">
            <div className="nopad x ">
              {this.state.icon && <Skycons icon={this.state.icon.toUpperCase().replace(/-/g, '_')}  color = 'white'  style = {{width:150, height:80}}/>} 
            </div>
            <div className="nopad x">{this.state.temperature}<sup>o</sup> <br /> {this.state.summary}</div>
          </div>
        </div>
        <div  className="marginspan"><span>Forecast for next 24 hours - </span></div>
        <div className="marginweek">
          {this.state.hourly && <LineExample daily={this.state.hourly}></LineExample>}
        </div>
        <div  className="marginspan"><span>Forecast for next week - </span></div>
        <div className="row marginweek">
          {this.state.daily.slice(1, 8).map( day => 
            <Weekforecast key={day.time} {...day} />
          )}
        </div>
        {this.props.lat && this.props.lng && this.state.time - 31622400 && <Weatherhistory lat={this.props.lat} lng={this.props.lng} oldtime={this.state.time - 31622400}></Weatherhistory>}
      </div>
      );
  }
}

export default Weatherapi;
