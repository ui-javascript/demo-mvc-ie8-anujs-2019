import React, { Component, PropTypes } from 'react'

class TimelineHeader extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <h3 className="timeline-header">
        <a href={this.props.url} target="_blank">{this.props.title}</a>
        {this.props.content}
        {this.props.children}
      </h3>
    )
  }
}

export default TimelineHeader
