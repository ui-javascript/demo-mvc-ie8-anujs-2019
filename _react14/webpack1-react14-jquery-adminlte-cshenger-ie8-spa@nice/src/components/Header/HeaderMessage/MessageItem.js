import React, { Component, PropTypes } from 'react'

class MessageItem extends Component {
  render () {
    return (
      <li>{/*<!-- start message -->*/}
        <a href={this.props.href}>
          <div className="pull-left">
            {/*<!-- User Image -->*/}
            <img src={this.props.userPicture} className="img-circle" alt="User Image" />
          </div>
          {/*<!-- Message title and timestamp -->*/}
          <h4>
            {this.props.title}
            <small><i className="fa fa-clock-o"></i> {this.props.time}</small>
          </h4>
          {/*<!-- The message -->*/}
          <p>{this.props.content}</p>
        </a>
      </li>
      /*<!-- end message -->*/
    );
  }
}

export default MessageItem
