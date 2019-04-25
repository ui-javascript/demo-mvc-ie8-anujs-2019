import React, { Component, PropTypes } from 'react'

class Callout extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={"callout "+this.props.theme}>
        <h4>{this.props.title}</h4>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

Callout.defaultProps = {
  theme: "callout-info"
}

export default Callout
