import React, { Component, PropTypes } from 'react'

class TimelineFooter extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="timeline-footer">
        {this.props.content}
        {this.props.children}
      </div>
    )
  }
}

export default TimelineFooter
