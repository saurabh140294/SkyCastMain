/*-----------------------------
Displays the weekly forecast 
------------------------------*/


import React from 'react';
import Skycons from 'react-skycons';

const Weekforecast = (day) => (
  	<div className="col">
  		<div className="nopad fontsmall x">{day.time}</div>
  		<div className="nopad x "><Skycons icon={day.icon.toUpperCase().replace(/-/g, '_')}  color = 'white'  style = {{width:75, height:40}}/></div>
    	<div className="nopad fontsmall x">Max: {day.temperatureHigh}<sup>o</sup>F</div>
    	<div className="nopad fontsmall x">Min: {day.temperatureLow}<sup>o</sup>F</div>
    	<div className="nopad fontsmall x"><small>{day.summary}</small></div>
  	</div>
);

export default Weekforecast;
