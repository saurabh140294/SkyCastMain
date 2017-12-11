//import express from 'express';

let fetch = require('node-fetch');
var axios = require('axios');


module.exports = {	
	getCurrentWeather : function(lat,lng){

		let darksky = 'https://api.darksky.net/forecast/';
		let key = 'bb7b02e2d4cc5e8762b64132e755c29d';
		//let lat = 45.3483;
		//let lng = -75.7584;
		let uri = darksky + key + '/' + lat +','+ lng;
		//console.log(uri);
		uri = uri.concat('?units=us&exclude=minutely');

		return axios.get(uri)
		.then((resp)=>{
			//console.log("axios resp: "+JSON.stringify(resp));
			return resp.data;
		});
	},

	getCurrentWeatherHist : function(lat,lng,oldtime){

		let darksky = 'https://api.darksky.net/forecast/';
		let key = 'bb7b02e2d4cc5e8762b64132e755c29d';
		//let lat = 45.3483;
		//let lng = -75.7584;
		let uri = darksky + key + '/' + lat +','+ lng + ',' + oldtime;
		//console.log(uri);
		uri = uri.concat('?units=us&exclude=minutely,currently');

		return axios.get(uri)
		.then((resp)=>{
			//console.log("axios resp: "+JSON.stringify(resp));
			return resp.data;
		});
	}

}


