import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ScoreContainer extends Component{
	render(){
		if(this.props.score!=null){
			return (
				<div id='scoreContainer'>SCORE : {this.props.score}</div>
			);
		} else{
			return (
				<div id='scoreContainer'>STARTING GAME . . .</div>
			);
		}
	}
}

export default ScoreContainer;