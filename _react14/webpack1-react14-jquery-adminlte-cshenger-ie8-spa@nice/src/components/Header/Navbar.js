import React, { Component, PropTypes } from 'react'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSidebarCollpase: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    let $body = document.body
    this.state.isSidebarCollpase ?
      this.setState({ isSidebarCollpase: false }) :
      this.setState({ isSidebarCollpase: true })
    this.state.isSidebarCollpase ?
      $body.className = $body.className.replace(/ sidebar\-collapse/g, '') :
      $body.className += ' sidebar-collapse'
  }

  render () {
    return (
      /*<!-- Header Navbar -->*/
      <nav className="navbar navbar-static-top" role="navigation">
        {/*<!-- Sidebar toggle button-->*/}
        <a href="javascript:void(0);" className="sidebar-toggle" onClick={this.toggleSidebar}>
          <span className="sr-only">Toggle navigation</span>
        </a>
        {/*<!-- Navbar Right Menu -->*/}
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            {this.props.children}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
