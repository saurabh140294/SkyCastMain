import React from 'react';
import Skycons from 'skycons-component';



class Icon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon:''
		};
	}


	componentWillReceiveProps(nextProps){
		let icon = nextProps.icon; 
		this.setState({
          	icon: icon
          });
		console.log(this.state.icon);
	}


	render() {
		return (
			<div>
			{this.state.}
			{this.state.icon && <Skycons icon={this.state.icon}  iconColor = 'white'  style = {{width:64, height:64}}/>} 
			
			</div>
			);
	}
}


export default Icon;