import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Timer extends Component {
	constructor(){
		super();
		this.state = {
			counter: 60
		};
	}
	updateTimer(){
		if(this.state.counter>0){
			var counter = this.state.counter - 1;
			this.setState({counter});
		} else{
			var finishGame = this.props.finishGame;
			finishGame();
		}
	}
	componentDidMount() {
		this.interval = setInterval(this.updateTimer.bind(this), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render(){
		return (
			<div style={{float: 'right', color: 'white'}}>{this.state.counter}</div>
		);
	}
}

export default Timer;