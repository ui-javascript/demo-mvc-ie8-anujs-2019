import React, { Component, PropTypes } from 'react'

class MainSidebar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          {this.props.userPanel}
          {this.props.search}
          <ul className="sidebar-menu tree">
            {this.props.children}
          </ul>
        </section>
      </aside>
    )
  }
}

export default MainSidebar
