import React, { Component } from "react";
import ReactDOM from "react-dom";

const SiteContainer = (props) => {
	return (
		<div>
			<h1>WebsiteYah</h1>
		</div>
	);
}

const NavigationContainer = (props) => {

	var navLinks = Array.from(document.querySelectorAll('header nav.primary li'));
	console.log(navLinks)

	var style;

	if(props.opened){
		style = {
			right: 0,
			position: 'absolute'
		}
	}
	else{
		style = {
			right: '100px',
			position: 'absolute'
		}
	}

	return (
		<div style={style}>
			<ul>
			{navLinks.map((item, key) => (
				<li key={key}>{item.innerText}</li>
			))}
			</ul>
		</div>
	);
}

class Window extends Component {
    constructor(props){
    super(props);
    this.state={
      opened: false
    }
    this.toggleNav=this.toggleNav.bind(this);
  }

	toggleNav(){
		this.setState(prevState => ({
		  opened: !prevState.opened
		}));
	}

	render(){

		var style = {
			position: 'relative',
			height: '1000px'
		}

	    return (
	    	<div onClick={this.toggleNav} style={style}>
	    		<p>{this.state.opened}</p>
	    		<SiteContainer />
	    		<NavigationContainer opened={this.state.opened}/>
			</div>
		);
	}
}


ReactDOM.render(
	<Window />,
	document.getElementById('react-entry')
);