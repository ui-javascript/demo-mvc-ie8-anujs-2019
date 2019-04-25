import React, { Component, PropTypes } from 'react'
import MessageItem from './MessageItem'
import { toggleDropdown } from '../../../services/common-func'

class HeaderMessage extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    toggleDropdown(this.dropdown)
  }

  render () {
    let messages = this.props.messages

    return (
      /*<!-- Messages: style can be found in dropdown.less-->*/
      <li className="dropdown messages-menu" ref={(dropdown) => {this.dropdown = dropdown}}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o"></i>
          <span className={"label " + this.props.theme}>{messages.length}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have {messages.length} message</li>
          <li>
            {/*<!-- inner menu: contains the messages -->*/}
            <ul className="menu">
              {messages.map((messageDetail, iterator) => {
                return (
                  <MessageItem
                    key={iterator}
                    href={messageDetail.href}
                    title={messageDetail.title}
                    userPicture={messageDetail.userPicture}
                    time={messageDetail.time}
                    content={messageDetail.content}  />
                )
              })}
            </ul>
            {/*<!-- /.menu -->*/}
          </li>
          <li className="footer"><a href="#">See All Messages</a></li>
        </ul>
      </li>
    );
  }
}

HeaderMessage.defaultProps = {
  theme: 'label-success'
}

export default HeaderMessage;
