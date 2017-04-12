import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScoreContainer from './ScoreContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MainContainer extends Component {
	constructor() {
		super();
		this.state = {
			completion: false,
			score: null,
			mapping: [],
			output: '',
			turnedCorrectly: [],
			turned: null,
			buffer: null
		};
	}
	componentWillMount(){
		this.showAnswer();
	}
	componentDidMount(){
		var generateGrid = this.generateGrid.bind(this);
		setTimeout(function(){
			generateGrid(null);
		}, 2200);
	}
	componentDidUpdate(){
		var updateGrid = this.updateGrid.bind(this);
		var turnedCorrectly = this.state.turnedCorrectly;
		var score = this.state.score;
		if(this.state.buffer){
			setTimeout(function(){
				updateGrid(turnedCorrectly, null, null, null);
			}, 500);
		}
		if(this.state.turnedCorrectly.length == 16){
			this.setState({completion: true});
		}
	}
	turnTile(evt){
		if(this.state.turned!=null){
			if( this.state.mapping[this.state.turned] === this.state.mapping[evt]){
				var turnedCorrectly = this.state.turnedCorrectly;
				turnedCorrectly.push(this.state.turned);
				turnedCorrectly.push(evt);
				var turned = null;
				this.updateGrid(turnedCorrectly, turned, null, true);
			} else{
				this.updateGrid(this.state.turnedCorrectly, this.state.turned, evt, false);
			}
		} else{
			this.updateGrid(this.state.turnedCorrectly, evt, null, null);
		}
	}
	
	updateGrid(turnedCorrectly, turned, buffer, score){
		var tempScore = this.state.score;
		const gridSize = this.props.size;
		var images = this.state.mapping;
		var output = [], counter = 0;
		for(var i=0; i<gridSize; i++){
			for(var j=0; j<gridSize; j++){
				if(turnedCorrectly.includes(counter) || counter===turned || counter===buffer){
					output.push(
						<div className='tile' style={{background: 'white'}}><img src={images[counter]} key={counter} className='svgIcon'/></div>
					);
				} else{
					output.push(
						<div className='tile' data={counter} onClick={this.turnTile.bind(this, counter)}><img src={images[counter]} key={counter} className='svgIcon' style={{ display: 'none' }}/></div>
					);
				}
				counter++;
			}
			output.push(<div style={{clear: 'both'}}></div>);
		}
		if(score!=null){
			if(score){
				tempScore+=20;
			}
			else tempScore-=5;
		}
		this.setState({ output, turnedCorrectly, turned, score: tempScore, buffer });
	}
	
	generateGrid(turned){
		const gridSize = this.props.size;
		var turnedCorrectly = this.state.turnedCorrectly;
		var images = this.state.mapping;
		var output = [], counter = 0;
		for(var i=0; i<gridSize; i++){
			for(var j=0; j<gridSize; j++){
				if(turnedCorrectly.includes(counter) || counter===turned){
					output.push(
						<div className='tile'><img src={images[counter]} key={counter} className='svgIcon' /></div>
					);
				} else{
					output.push(
						<div className='tile' data={counter} onClick={this.turnTile.bind(this, counter)}><img src={images[counter]} className='svgIcon' style={{visibility: 'hidden'}} key={counter}/></div>
					);
				}
				counter++;
			}
			output.push(<div style={{clear: 'both'}}></div>);
		}
		//return output;
		this.setState({ mapping: images, output, turned, score: 0 });
	}
	showAnswer(){
		const gridSize = this.props.size;
		var turnedCorrectly = this.state.turnedCorrectly;
		var images = this.generateMapping();
		var output = [], counter = 0;
		for(var i=0; i<gridSize; i++){
			for(var j=0; j<gridSize; j++){
				output.push(
					<div className='tile'><img src={images[counter]} key={counter} className='svgIcon' /></div>
				);
				counter++;
			}
			output.push(<div style={{clear: 'both'}}></div>);
		}
		//return output;
		this.setState({ mapping: images, output });
	}
	generateMapping(){
		const gridSize = this.props.size;
		var images = this.props.images;
		var mapping = [];
		var i = 0;
		while(i<gridSize){
			mapping = mapping.concat(images);
			i++;
		}
		var randomizedArray = this.randomize(mapping);
		return randomizedArray;
	}
	randomize(a){
		for (let i = a.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[a[i - 1], a[j]] = [a[j], a[i - 1]];
		}
		return a;
	}
	render() {
		//var output = this.generateGrid();
		if(!this.state.completion){
			return (
				<div className='container'>
					<ScoreContainer score={this.state.score} />
					<div className='row'>
					<ReactCSSTransitionGroup transitionName = "example" 
					transitionAppear = {true} transitionAppearTimeout = {500} 
					transitionEnter = {false} transitionLeave = {false}>
						{this.state.output}
					</ReactCSSTransitionGroup>
					</div>
				</div>
			);
		} else{
			return(
				<div style={{ textAlign: 'center' }}>
					<div id='completed'>
					<h3>You've completed the game successfully !</h3>
					<h2>Your score : {this.state.score}</h2>
					</div>
				</div>
			);
		}
	}
}

export default MainContainer;