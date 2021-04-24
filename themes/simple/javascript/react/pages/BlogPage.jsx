import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

class BlogPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			Title: '...',
			Content: '<p></p>',
			ArticleMarkup: '<p></p>'
		}
		this.renderArticle = this.renderArticle.bind(this);
	}

	async componentDidMount(){
		await this.loadViewableData();
		this.renderArticle();
	}

	componentDidUpdate(prevProps){
		if(prevProps.location.key !== this.props.location.key){
			this.renderArticle();
		}
	}

	async loadViewableData(){
		this.setState({
			Content: '<div class="lds-facebook"><div></div><div></div><div></div></div>'
		});
		const data = await this.props.fetchViewableData();
		if(data){
			if(data.Title){
				document.querySelector('title').innerHTML = data.Title;
			}
			let parsedContent = '<p></p>';
			if(data.Content){
				parsedContent = data.Content.replace(/\[image(.*)\]/, '<img $1 />');
			}
			this.setState({
				Title: data.Title,
				URLSegment: data.URLSegment,
				Content: parsedContent,
				ElementalArea: data.ElementalArea,
				Articles: JSON.parse(data.Articles),
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
		}
	}

	async renderArticle(){
		if(/\/articles\/\w+/.test(document.location)){
			this.setState({
				ArticleMarkup: '<div class="lds-facebook"><div></div><div></div><div></div></div>'
			});
			await fetch(document.location, {headers: {'x-requested-with': 'XMLHttpRequest'}})
				.then(response => response.text())
				.then(response => this.setState({ArticleMarkup: response}));
		} else {
			this.setState({ArticleMarkup: '<p></p>'});
		}
	}

	render(){
		return (
			<div className='inner typography line'>
				<h1>{this.state.Title}</h1>
				<div dangerouslySetInnerHTML={{__html: this.state.Content}}></div>
				{	// If social media links
					this.state.SiteConfig_SocialMediaLinks
					? 	<ul className="social-banner">
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
				<div dangerouslySetInnerHTML={{__html: this.state.ArticleMarkup}}></div>
				{	// If articles
					this.state.Articles
					? 	<div>
							<h2>Latest Articles</h2>
							<ul className='blog-listing flex'>
								{this.state.Articles.map((article) => 
									<li className="d-33 m-100" key={this.state.Articles.indexOf(article)}>
										<Link to={`/${this.state.URLSegment}/articles/${article.URLSegment}`}>
											<p>{article.Title}</p>
											<div className='img-container'>
												<img src={article.Image}/>
											</div>
										</Link>
									</li>
								)}
							</ul>
						</div>
					: ''
				}
				<div dangerouslySetInnerHTML={{__html: this.state.ElementalArea}}></div>
			</div>
		);
	}
}

export default withRouter(BlogPage);