import React, { Component } from "react";

class BlogPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			Content: '<p></p>',
			ArticleMarkup: '<p></p>'
		}
		this.renderArticle = this.renderArticle.bind(this);
	}

	componentDidMount(){
		this.loadViewableData();
	}

	async loadViewableData(){
		const data = await this.props.fetchViewableData();
		if(data){
			const parsedContent = data.Content.replace(/\[image(.*)\]/, '<img $1 />');
			this.setState({
				URLSegment: data.URLSegment,
				Content: parsedContent,
				Articles: JSON.parse(data.Articles),
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
		}
	}

	async renderArticle(event){
		event.preventDefault();
		if(event.currentTarget.href){
			var route = event.currentTarget.href;
			await fetch(route)
				.then(response => response.text())
				.then(response => this.setState({ArticleMarkup: response}));
		}
	}

	render(){
		return (
			<div className='inner typography line'>
				<h1>React Code</h1>
				<h2>Blog Page</h2>
				<div dangerouslySetInnerHTML={{__html: this.state.Content}}></div>
				{	// If articles
					this.state.Articles
					? 	<ul>
							{this.state.Articles.map((article) => 
								<li key={this.state.Articles.indexOf(article)}>
									<a onClick={this.renderArticle} href={`/${this.state.URLSegment}/articles/${article.URLSegment}`}>
										<div dangerouslySetInnerHTML={{__html: article.Content}}></div>
									</a>
								</li>
							)}
						</ul>
					: ''
				}
				<h3>Current Article</h3>
				<div dangerouslySetInnerHTML={{__html: this.state.ArticleMarkup}}></div>
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

export default BlogPage;