import React, { Component, PropTypes } from 'react'

class SocialButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let position
    switch (this.props.position) {
      case 'left':
        position = 'pull-left'
        break
      case 'right':
        position = 'pull-right'
        break
      default:
        position = ''
    }

    if (this.props.type === 'like') {
      return (
        <button className={"btn btn-xs " + position + " " + this.props.theme}>
          <i className="fa fa-thumbs-o-up"></i> Like
        </button>
      )
    } else if (this.props.type === 'share') {
      return (
        <button className={"btn btn-xs " + position + " " + this.props.theme}>
          <i className="fa fa-share"></i> Share
        </button>
      )
    }
  }
}

SocialButton.defaultProps = {
  position: '',
  type: 'like',
  theme: 'btn-default'
}

export default SocialButton
