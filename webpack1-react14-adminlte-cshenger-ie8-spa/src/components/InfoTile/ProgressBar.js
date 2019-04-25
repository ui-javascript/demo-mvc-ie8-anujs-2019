import React, { Component, PropTypes } from 'react'

class ProgressBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let style = {
      width: this.props.percent + '%',
      backgroundColor: this.props.color
    }

    return (
      <div>
        <div className="progress">
          <div className="progress-bar" style={style}></div>
        </div>
        <span className="progress-description">
          {this.props.description}
        </span>
      </div>
    )
  }
}

ProgressBar.defaultProps = {
  percent: 50,
  description: `Default progress 50%`,
  color: 'white'
}

ProgressBar.propTypes = {
  percent: PropTypes.number
}

export default ProgressBar
