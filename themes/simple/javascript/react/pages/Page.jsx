import React, { Component } from "react";

class Page extends Component {
	constructor(props){
		super(props);
		this.state = {
			Title: '...',
			Content: '<p></p>'
		}
	}

	componentDidMount(){
		this.loadViewableData();
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
				Content: parsedContent,
				ElementalArea: data.ElementalArea,
				SiteConfig_Title: data.SiteConfig_Title,
				SiteConfig_Phone: data.SiteConfig_Phone,
				SiteConfig_SocialMediaLinks: JSON.parse(data.SiteConfig_SocialMediaLinks)
			});
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
				<div dangerouslySetInnerHTML={{__html: this.state.ElementalArea}}></div>
			</div>
		);
	}
}

export default Page;