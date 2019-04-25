import React, { Component, PropTypes } from 'react'

class Badge extends Component {
  render () {
    return (
      <span className={this.props.type+" "+this.props.theme}>{this.props.children}</span>
    )
  }
}

Badge.defaultProps = {
  type: "badge",
  theme: "bg-light-blue"
}

export default Badge
