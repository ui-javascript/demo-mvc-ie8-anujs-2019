import React, { Component, PropTypes } from 'react'

class SocialInfo extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let position = ''
    switch (this.props.position) {
      case 'left':
        position = 'pull-left'
        break
      case 'right':
        position = 'pull-right'
        break
      default:
        position = 'pull-right'
    }

    return (
      <span className={"text-muted " + position}>
        {this.props.info}
      </span>
    )
  }
}

SocialInfo.defaultProps = {
  info: '',
  position: 'pull-right'
}

export default SocialInfo
