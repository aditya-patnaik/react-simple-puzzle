import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';

class Hello extends React.Component {
	constructor(){
		super();
		this.state = {
			grid: 4,
			images: ['images/1.svg', 'images/2.svg', 'images/3.svg', 'images/4.svg']
		};
	}
	render() {
		return (
			<MainContainer size={this.state.grid} images={this.state.images} />
		)
	}
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));