import React, { Component, PropTypes } from 'react'

class SidebarUserPanel extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let userPanels = this.props.userPanels

    return (
      /*<!-- Sidebar user panel (optional) -->*/
      <div className="user-panel">
        <div className="pull-left image">
          <img src={userPanels.imgs} className="img-circle" alt={userPanels.imgsAlt} />
        </div>
        <div className="pull-left info">
          <p>{userPanels.title}</p>
          {/*<!-- Status -->*/}
          <a href={userPanels.userLink}>
            { userPanels.isOnline ?
              <span><i className="fa fa-circle text-success"></i> Online</span> :
              <span><i className="fa fa-circle text-danger"></i> Drops</span>
            }
          </a>
        </div>
      </div>
    )
  }
}

export default SidebarUserPanel
