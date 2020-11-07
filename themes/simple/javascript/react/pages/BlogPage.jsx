import React, { Component } from "react";

class BlogPage extends Component {
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
		const data = await this.props.fetchViewableData();
		if(data){
			const parsedContent = data.Content.replace(/\[image(.*)\]/, '<img $1 />');
			this.setState({
				Content: parsedContent,
				Articles: JSON.parse(data.Articles),
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
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
									<a href={article.URLSegment}>
										{article.Content}
									</a>
								</li>
							)}
						</ul>
					: ''
				}
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