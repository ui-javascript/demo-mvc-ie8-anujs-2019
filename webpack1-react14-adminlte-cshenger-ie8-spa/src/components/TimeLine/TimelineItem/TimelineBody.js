import React, { Component, PropTypes } from 'react'

class TimelineBody extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="timeline-body">
        {this.props.content}
        {this.props.children}
      </div>
    )
  }
}

TimelineBody.defaultProps = {
  content: 'Sample content'
}

export default TimelineBody
