import React, { Component, PropTypes } from 'react'

class HeaderBar extends Component {
	render () {
		return (
			<div className="main-header">
				{this.props.children}
			</div>
		);
	}
}

export default HeaderBar;