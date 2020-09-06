import React, { Component } from "react";
import ReactDOM from "react-dom";

async function fetchViewableData(){
	const path = document.location.pathname === '/' ? `${document.location}home` : document.location;
	try{
		const response = await fetch(`${path}/fetchViewableData`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		});
		const body = await response.text();
		const result = JSON.parse(body);

		return result;
	} catch(error){
		console.log(`Error: ${error}`);
	}
}

class SiteContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			Content: '<p></p>'
		}
	}

	componentDidMount(){
		this.loadViewableData();
	}

	async loadViewableData(){
		const data = await fetchViewableData();
		if(data){
			this.setState({
				Content: data.Content,
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
		}
	}

	render(){
		return (
			<div>
				<h1>WebsiteYah</h1>
				<div dangerouslySetInnerHTML={{__html: this.state.Content}}></div>
				{	// If social media links
					this.state.SiteConfig_SocialMediaLinks
					? 	<ul>
							{this.state.SiteConfig_SocialMediaLinks.map((sml) => 
								<li key={this.state.SiteConfig_SocialMediaLinks.indexOf(sml)}>
									<a href={sml.Link}>
										<i className={`fa fa-${sml.Icon}`}></i>
										{sml.Type}
									</a>
								</li>
							)}
						</ul>
					: ''
				}
			</div>
		);
	}
}

const NavigationContainer = (props) => {

	var navLinks = Array.from(document.querySelectorAll('header nav.primary li'));

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
	    	<div style={style}>
	    		<p>{this.state.opened}</p>
	    		<SiteContainer />
	    		<NavigationContainer onClick={this.toggleNav} opened={this.state.opened}/>
			</div>
		);
	}
}


ReactDOM.render(
	<Window />,
	document.getElementById('react-entry')
);