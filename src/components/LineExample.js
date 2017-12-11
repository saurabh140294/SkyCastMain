import React from 'react';
import {Line} from 'react-chartjs-2';


class LineExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			daily:[],
			data: {
				labels: [],
				datasets: [
				{
					label: 'Temperature',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: []
				}
				]
			}
		};
	}



	componentWillReceiveProps(nextProps){
		this.state.data.labels=[];
		this.state.data.datasets[0].data=[];
		if(nextProps.daily != this.props.daily){
			nextProps.daily.slice(0,24).map( label => {
				this.state.data.labels.push(label.time+":00");
				this.state.data.datasets[0].data.push(label.temperature);
			} );
		}
		else{
			nextProps.daily.slice(0,24).map( label => {
				this.state.data.labels.push(label.time+":00");
				this.state.data.datasets[0].data.push(label.temperature);
			} );
		}
	}


	render() {
		let line;
		if(this.state.data.labels!='' && this.state.data.datasets.data!='') {
			line = <Line 
			data={this.state.data} 
			options={{
				maintainAspectRatio: false
			}}/>
		} else {
			line = null
		}
		return (
			<div>
				<div className="row hourwidth back">
					{line}
				</div>
			</div>
			);
	}
}


export default LineExample;