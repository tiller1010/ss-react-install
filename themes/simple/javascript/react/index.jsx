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
		if(window.innerWidth < 815){
			this.setState(prevState => ({
			  opened: !prevState.opened
			}));
		}
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
		// Used for routing
		var allFormattedNavLinks = [];
		// Get top level nav links
		var navLinks = Array.from(document.querySelectorAll('header nav.primary > ul > li > a'));
		var formattedNavLinks = [];
		navLinks.forEach((link) => {
			var formattedLink = {};
			formattedLink.Title = link.innerText;
			var urlSegment = link.href.split('/').reverse()[1] !== document.domain ? '/' + link.href.split('/').reverse()[1] : '/home';
			formattedLink.URLSegment = urlSegment;
			formattedLink.pagetype = link.attributes.pagetype.value;
			// Get dropdown nav links
			formattedLink.children = [];
			var subPages = Array.from(link.parentElement.querySelectorAll('ul.nav-dropdown li a'));
			subPages.forEach((subPage) => {
				var formattedSubPageLink = {};
				formattedSubPageLink.Title = subPage.innerText;
				var subPageUrlSegment = subPage.href.replace(document.location.origin, '');
				formattedSubPageLink.URLSegment = subPageUrlSegment;
				formattedSubPageLink.pagetype = subPage.attributes.pagetype.value;
				formattedLink.children.push(formattedSubPageLink);
				allFormattedNavLinks.push(formattedSubPageLink);
			});
			formattedNavLinks.push(formattedLink);
			allFormattedNavLinks.push(formattedLink);
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
					<div className='nav'>
						<ul className='main-nav-list'>
							{formattedNavLinks.map((item) => (
								<li onClick={this.toggleNav} key={formattedNavLinks.indexOf(item)} className='main-nav-list-item'>
									<Link to={item.URLSegment}>
										{item.Title}
									</Link>
									{item.children.length ?
										<ul className="main-nav-dropdown">
											{item.children.map((subPageItem) => (
												<li onClick={this.toggleNav} key={item.children.indexOf(subPageItem)}>
													<Link to={subPageItem.URLSegment}>
														{subPageItem.Title}
													</Link>
												</li>
											))}
										</ul>
										:
										''
									}
								</li>
							))}
						</ul>
					</div>
					<Switch>
						<Route exact path='/'>
							<Page fetchViewableData={fetchViewableData}/>
						</Route>
						{allFormattedNavLinks.map((item) => (
							<Route key={allFormattedNavLinks.indexOf(item)} path={item.URLSegment}>
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