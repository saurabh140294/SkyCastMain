import React from 'react';
import api from '../../api';
import Maps from './Maps';
import ContestPreview from './ContestPreview';
import ContestPreview1 from './ContestPreview1';
import Skycons from 'react-skycons';
import Weatherhistory from './Weatherhistory';
import LineExample from './LineExample';


let fetch = require('node-fetch');
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
    //console.log("lat="+lat+", lng="+lng);

    axios.get("/getweather?latitude="+lat+"&longitude="+lng)
    .then((resp)=>{
        //console.log("axios resp: "+JSON.stringify(resp.data.hourly.data));

        resp.data.hourly.data.map((a)=> {
          let t = new Date(a.time * 1000);
          a.time = t.getHours();
          //console.log("a.time= "+a.time);
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
          //console.log("DAY = "+n);
        });
          //console.log("hourlydata=" +JSON.stringify(resp.data.hourly.data));
          this.setState({
            temperature: resp.data.currently.temperature,
            summary: resp.data.currently.summary,
            time: resp.data.currently.time,
            icon: resp.data.currently.icon,
            hourly: resp.data.hourly.data,
            daily: resp.data.daily.data
          });

          console.log("hourlydata=" +JSON.stringify(this.state.icon));
      //return resp.data;
    });
  }

  componentWillReceiveProps(nextProps) {  
    if(nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng ){
      //console.log("next= " + nextProps.lat+", "+nextProps.lng);
      let lat = nextProps.lat; 
      let lng = nextProps.lng;

      //console.log("lat="+lat+", lng="+lng);

      axios.get("/getweather?latitude="+lat+"&longitude="+lng)
      .then((resp)=>{
        //console.log("axios resp: "+JSON.stringify(resp.data.hourly.data));

        resp.data.hourly.data.map((a)=> {
          let t = new Date(a.time * 1000);
          a.time = t.getHours();
          //console.log("a.time= "+a.time);
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
          //console.log("DAY = "+n);
        });
          //console.log("hourlydata=" +JSON.stringify(resp.data.hourly.data));
          this.setState({
            temperature: resp.data.currently.temperature,
            summary: resp.data.currently.summary,
            icon: resp.data.currently.icon,
            hourly: resp.data.hourly.data,
            daily: resp.data.daily.data
          });
          console.log("hourlydata=" +JSON.stringify(this.state.icon));
      //return resp.data;
    });
    }
  }


  componentWillUnmount() {
    // clean timers, listeners
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
          <ContestPreview1 key={day.time} {...day} />
          )}
        </div>
        {this.props.lat && this.props.lng && this.state.time - 31622400 && <Weatherhistory lat={this.props.lat} lng={this.props.lng} oldtime={this.state.time - 31622400}></Weatherhistory>}
      </div>
      );
  }


}

export default Weatherapi;
