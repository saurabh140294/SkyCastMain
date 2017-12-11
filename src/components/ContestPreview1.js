import React from 'react';
import Skycons from 'skycons-component';

const ContestPreview1 = (day) => (
  	<div className="col">
  		<div className="nopad fontsmall x">{day.time}</div>
  		<div className="nopad x "><Skycons icon={day.icon}  iconColor = 'white'  style = {{width:40, height:40}}/></div>
    	<div className="nopad fontsmall x">Max: {day.temperatureHigh}<sup>o</sup></div>
    	<div className="nopad fontsmall x">Min: {day.temperatureLow}<sup>o</sup></div>
    	<div className="nopad fontsmall x"><small>{day.summary}</small></div>
  	</div>
);

export default ContestPreview1;
