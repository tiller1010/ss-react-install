import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import { Link } from 'react-router-dom';
import Page from './pages/Page.jsx';
import BlogPage from './pages/BlogPage.jsx';
import { createBrowserHistory } from "history";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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



class Window extends Component {
	constructor(props){
	  super(props);
	  this.state={
	    opened: false
	  }
	  this.toggleNav=this.toggleNav.bind(this);
	  this.renderSwitch=this.renderSwitch.bind(this);
	}

	toggleNav(){
		this.setState(prevState => ({
		  opened: !prevState.opened
		}));
	}

	renderSwitch(pagetype){
		switch(pagetype){
			case 'Page':
				return <Page fetchViewableData={fetchViewableData}/>
			case 'BlogPage':
				return <BlogPage fetchViewableData={fetchViewableData}/>
			break;
		}
	}

	componentDidMount(){
		const context = this;
		window.addEventListener('resize', function(){
			if(window.innerWidth > 815){
				context.setState({
					opened: false
				});
			}
		})
	}

	render(){
		var navLinks = Array.from(document.querySelectorAll('header nav.primary li a'));
		var formattedNavLinks = [];
		navLinks.forEach((link) => {
			var formattedLink = {};
			formattedLink.Title = link.innerText;
			var urlSegment = link.href.split('/').reverse()[1] !== document.domain ? '/' + link.href.split('/').reverse()[1] : '/home';
			formattedLink.URLSegment = urlSegment;
			formattedLink.pagetype = link.attributes.pagetype.value;
			formattedNavLinks.push(formattedLink);
		});

		var style;

		if(this.state.opened){
			style = {
				transform: 'translateX(-200px)'
			}
		}
		else{
			style = {
				transform: 'translateX(0)'
			}
		}
		return (
			<div style={style} className='window-component'>
					<div className='main-nav-menu-button' onClick={this.toggleNav}>
						<FontAwesomeIcon icon={faBars}/>
					</div>
					<ul className='main-nav-list'>
						{formattedNavLinks.map((item) => (
							<li key={formattedNavLinks.indexOf(item)} className='main-nav-list'><Link to={item.URLSegment}>{item.Title}</Link></li>
						))}
					</ul>
					<Switch>
						<Route exact path='/'>
							<Page fetchViewableData={fetchViewableData}/>
						</Route>
						{formattedNavLinks.map((item) => (
							<Route key={formattedNavLinks.indexOf(item)} exact path={item.URLSegment}>
									{this.renderSwitch(item.pagetype)}
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