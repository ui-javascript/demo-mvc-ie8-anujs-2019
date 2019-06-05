import React, { Component, PropTypes } from 'react'

class Conversations extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="direct-chat-messages">
        {this.props.conversations.map((messageDetails, iteator) => {
          return (
            <div className={"direct-chat-msg " + messageDetails.align} key={"message"+iteator}>
              <div className="direct-chat-info clearfix">
                <span className="direct-chat-name pull-right">
                  {messageDetails.displayName}
                </span>
                <span className="direct-chat-timestamp pull-left">
                  {messageDetails.date}
                </span>
              </div>
              {/* /.direct-chat-info */}
              <img className="direct-chat-img" src={messageDetails.displayPicture} alt="message user image" />
              {/* /.direact-chat-img */}
              <div className="direct-chat-text">
                {messageDetails.message}
              </div>
              {/* /.direct-chat-text */}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Conversations
