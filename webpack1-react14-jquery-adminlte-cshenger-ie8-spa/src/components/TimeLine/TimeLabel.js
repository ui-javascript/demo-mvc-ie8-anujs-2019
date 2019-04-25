import React, { Component, PropTypes } from 'react'

class TimeLabel extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <li className="time-label">
        <span className={this.props.theme}>
          {this.props.content}
        </span>
      </li>
    )
  }
}

TimeLabel.defaultProps = {
  theme: 'bg-red',
	content: 'Default content',
}

export default TimeLabel
