import React, { Component } from "react";

class Page extends Component {
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

export default Page;