import React, { Component, PropTypes } from 'react'

class NotificationItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <li>{/*<!-- start notification -->*/}
        <a href={this.props.href}>
          <i className={this.props.theme}></i> {this.props.content}
        </a>
      </li>
      /*<!-- end notification -->*/
    )
  }
}

export default NotificationItem
