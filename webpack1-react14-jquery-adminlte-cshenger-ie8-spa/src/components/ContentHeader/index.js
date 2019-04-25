import React, { Component, PropTypes } from 'react'

class ContentHeader extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <section className="content-header">
        <h1>
          {this.props.content}
          { this.props.title ? <small>{this.props.title}</small> : '' }
        </h1>
        { this.props.children }
      </section>
    )
  }
}

export default ContentHeader
