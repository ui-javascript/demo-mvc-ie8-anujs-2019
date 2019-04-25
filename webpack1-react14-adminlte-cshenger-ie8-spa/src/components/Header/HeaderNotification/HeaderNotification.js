import React, { Component, PropTypes } from 'react'
import NotificationItem from './NotificationItem'
import { toggleDropdown } from '../../../services/common-func'

class HeaderNotification extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    toggleDropdown(this.dropdown)
  }

  render () {
    let notifications = this.props.notifications

    return (
      /*<!-- Notifications Menu -->*/
      <li className="dropdown notifications-menu" ref={(dropdown) => {this.dropdown = dropdown}}>
        {/*<!-- Menu toggle button -->*/}
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-bell-o"></i>
          <span className={"label " + this.props.theme}>{notifications.length}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have {notifications.length} notifications</li>
          <li>
            {/*<!-- Inner Menu: contains the notifications -->*/}
            <ul className="menu">
              {notifications.map((notificationDetails, iterator) => {
                return (
                  <NotificationItem
                    key={iterator}
                    href={notificationDetails.href}
                    content={notificationDetails.content}
                    theme={notificationDetails.theme} />
                )
              })}
            </ul>
          </li>
          <li className="footer"><a href="#">View all</a></li>
        </ul>
      </li>
    )
  }
}

HeaderNotification.defaultProps = {
  theme: 'label-warning'
}

export default HeaderNotification
