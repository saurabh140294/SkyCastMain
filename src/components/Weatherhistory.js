/*------------------------------------------
Calls the time machine API of Dark SKY to get
the temperature of one year back.
-------------------------------------------*/


import React from 'react';
import api from '../../api';
import Maps from './Maps';
import Skycons from 'skycons-component';
import LineExample from './LineExample';


let fetch = require('node-fetch');
var axios = require('axios');


class Weatherhistory extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hourly: []
		};
	}


/*	componentWillMount(){		
		let lat = this.props.lat; 
		let lng = this.props.lng;
		let oldtime = this.props.oldtime ;

		//console.log("lat="+lat+", lng="+lng+", oldtime = " +oldtime);

		axios.get("/getweatherhist?latitude="+lat+"&longitude="+lng+"&time="+oldtime)
		.then((resp)=>{
			//console.log("getweather hist: "+JSON.stringify(resp.data));

			resp.data.hourly.data.map((a)=> {
				let t = new Date(a.time * 1000);
				a.time = t.getHours();
          //console.log("t.time= "+t);
      	});
          //console.log("hourlydata=" +JSON.stringify(resp.data.hourly.data));
          this.setState({
          	hourly: resp.data.hourly.data
          });
          //console.log("DAILY DATA = "+ JSON.stringify(this.state.daily));
      //return resp.data;
  });
	}
	*/


	componentWillReceiveProps(nextProps) { 
		let lat = nextProps.lat; 
		let lng = nextProps.lng;
		let oldtime = nextProps.oldtime;
		axios.get("/getweatherhist?latitude="+lat+"&longitude="+lng+"&time="+oldtime)
		.then((resp)=>{
			resp.data.hourly.data.map((a)=> {
				let t = new Date(a.time * 1000);
				a.time = t.getHours();
			});
			this.setState({
				hourly: resp.data.hourly.data
			});
		});
	}


	componentWillUnmount() {
	}


	render() {
		return (
			<div>
				<div className="marginspan"><span>Hourly weather of this day last year - </span></div>
				<div className="marginweek">{this.state.hourly && <LineExample daily={this.state.hourly}></LineExample>}</div>
			</div>
			);
	}


}

export default Weatherhistory;
