import React, { Component, PropTypes } from 'react'
import UserBodyItem from './UserBodyItem'
import { toggleDropdown } from '../../../services/common-func'

class HeaderUser extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    toggleDropdown(this.dropdown)
  }

  render () {
    let userContent = this.props.userContent
    let userBodys = this.props.userBodys

    return (
      /*<!-- User Account Menu -->*/
      <li className="dropdown user user-menu" ref={(dropdown) => {this.dropdown = dropdown}}>
        {/*<!-- Menu Toggle Button -->*/}
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          {/*<!-- The user image in the navbar-->*/}
          <img src={userContent.userImg} className="user-image" alt={userContent.userImgAlt} />
          {/*<!-- hidden-xs hides the username on small devices so only the image appears. -->*/}
          <span className="hidden-xs">{userContent.userName}</span>
        </a>
        <ul className="dropdown-menu">
          {/*<!-- The user image in the menu -->*/}
          <li className="user-header">
            <img src={userContent.userImg} className="img-circle" alt={userContent.userImgAlt} />
            <p dangerouslySetInnerHTML={{__html: userContent.userMessage}} />
          </li>
          {/*<!-- Menu Body -->*/}
          {userBodys.length > 0 ?
            <li className="user-body">
              <div className="row">
                {userBodys.map((bodyItem, iteartor) => {
                  return (
                    <UserBodyItem
                      key={iteartor}
                      href={bodyItem.href}
                      title={bodyItem.title} />
                  )
                })}
              </div>
              {/*<!-- /.row -->*/}
            </li> : ''}
          {/*<!-- Menu Footer-->*/}
          <li className="user-footer">
            <div className="pull-left">
              <a href={userContent.userProfileLink} className="btn btn-default btn-flat">{userContent.userProfile}</a>
            </div>
            <div className="pull-right">
              <a href={userContent.userSingOutLink} className="btn btn-default btn-flat">{userContent.userSingOut}</a>
            </div>
          </li>
        </ul>
      </li>
    )
  }
}

export default HeaderUser
