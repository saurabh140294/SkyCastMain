import React from 'react';

const Header = ({ message }) => {
	return (
		<h2 className="my-4 x"> 
			{ message } <small>Real-Time Weather Application</small> 
		</h2>
	);
};


export default Header;
