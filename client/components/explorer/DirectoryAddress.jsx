import { Component } from "react";

import { navigateToFolder } from "../../actions/explorer/";

export default class DirectoryAddress extends Component {

	navigateToParent(id) {
		this.props.dispatch(navigateToFolder(id));
	}

	render() {
		// Only output last 3 parent folder names
		let parents = this.props.data.scopeParents.splice(-3); 
	
		return (
			<div className="explorer-directory-address">{
				parents.map(dir => {
					return (
						<span 
							className="explorer-directory-address-item" 
							onClick={() => { this.navigateToParent(dir.id); }}
						>{
							dir.name + "/"
						}</span>
					);
				})
			}</div>
		);
	}

}