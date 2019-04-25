import React, { Component, PropTypes } from 'react'

class UserBodyItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="col-xs-4 text-center">
        <a href={this.props.href}>{this.props.title}</a>
      </div>
    )
  }
}

export default UserBodyItem
