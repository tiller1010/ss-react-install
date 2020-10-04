import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import { Link } from 'react-router-dom';
import { createBrowserHistory } from "history";
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

class PageContainer extends Component {
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
			const parsedContent = data.Content.replace(/\[image(.*)\]/, '<img $1 />');
			this.setState({
				Content: parsedContent,
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
		}
	}

	render(){
		return (
			<div>
				<h1>React Code</h1>
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
		var navLinks = Array.from(document.querySelectorAll('header nav.primary li a'));
		var formattedNavLinks = [];
		navLinks.forEach((link) => {
			var formattedLink = {};
			formattedLink.Title = link.innerText;
			var urlSegment = link.href.split('/').reverse()[1] !== document.domain ? '/' + link.href.split('/').reverse()[1] : '/home';
			formattedLink.URLSegment = urlSegment;
			formattedNavLinks.push(formattedLink);
		});

		var style;

		if(this.state.opened){
			style = {
				// right: 0,
				// position: 'absolute'
			}
		}
		else{
			style = {
				// right: '100px',
				// position: 'absolute'
			}
		}
		return (
			<div style={style}>
					<ul>
						{formattedNavLinks.map((item) => (
							<li key={formattedNavLinks.indexOf(item)}><Link to={item.URLSegment}>{item.Title}</Link></li>
						))}
					</ul>
					<Switch>
						<Route exact path='/'>
							<PageContainer/>
						</Route>
						{formattedNavLinks.map((item) => (
							<Route key={formattedNavLinks.indexOf(item)} exact path={item.URLSegment}>
								<PageContainer/>
							</Route>
						))}
					</Switch>
			</div>
		);
	}
}

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
	    <Window/>
	</Router>,
	document.getElementById('react-entry')
);