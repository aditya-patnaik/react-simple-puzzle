import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';

class ScoreContainer extends Component{
	constructor(){
		super();
		this.state = {
			countdown: 3,
			countdownText: ' .'
		}
	}
	componentDidMount(){
		var countdown = this.countdown.bind(this);
		setTimeout(function(){
			countdown();
		}, 1000);
	}
	componentDidUpdate(){
		if(this.state.countdown>0){
			var countdown = this.countdown.bind(this);
			setTimeout(function(){
				countdown();
			}, 1000);
		}
	}
	countdown(){
		var countdown = this.state.countdown - 1;
		var countdownText = this.state.countdownText + ' .';
		this.setState({ countdown, countdownText });
	}
	render(){
		if(this.props.score!=null){
			return (
				<div id='scoreContainer'>
					<div style={{float: 'left'}}>SCORE : {this.props.score}</div>
					<div style={{float: 'right'}}><Timer finishGame={this.props.finishGame} /></div>
					<div style={{clear: 'both'}}></div>
				</div>
			);
		} else{
			return (
				<div id='scoreContainer'>STARTING GAME{this.state.countdownText}</div>
			);
		}
	}
}

export default ScoreContainer;