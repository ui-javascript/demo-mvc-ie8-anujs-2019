import React, { Component, PropTypes } from 'react'

class AlertInfo extends Component {
  constructor (props) {
    super(props)
    this.removeAlert = this.removeAlert.bind(this)
  }

  removeAlert (event) {
    event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode)
  }

  render () {
    return (
      <div className={"alert alert-dismissible "+this.props.theme}>
        <button type="button" className="close" onClick={this.removeAlert}>×</button>
        <h4>
          {this.props.icon ? <i className={"icon fa "+this.props.icon}></i> : ''}
          {this.props.title}
        </h4>
        {this.props.content}
      </div>
    )
  }
}

AlertInfo.defaultProps = {
  theme: "alert-info",
  icon: "fa-info"
}

export default AlertInfo
