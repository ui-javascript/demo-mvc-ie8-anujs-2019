import React, { Component, PropTypes } from 'react'

class Footer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      /*<!-- Main Footer -->*/
      <footer className="main-footer">
        {/*<!-- To the right -->*/}
        <div className="pull-right hidden-xs">
          {this.props.content}
        </div>
        {/*<!-- Default to the left -->*/}
        {this.props.children}
      </footer>
    )
  }
}

export default Footer
