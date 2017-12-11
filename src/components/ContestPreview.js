import React from 'react';

const ContestPreview = (hour) => (
	<div className="col hourdataelem">
		<div className="nopad fontsmall">{hour.time}</div>
		<div className="nopad fontsmall">{hour.temperature}</div>
	</div>
	);

export default ContestPreview;
