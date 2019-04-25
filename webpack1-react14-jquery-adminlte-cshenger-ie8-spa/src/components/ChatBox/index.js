import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { toggleBoxCollapse, removeBox } from '../../services/common-func'
import './contacts.css'

class ChatBox extends Component {
  constructor (props) {
    super(props)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.removeBox = this.removeBox.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
    this.state = {
      message: ''
    }
  }

  changeMessage (ev) {
    this.setState({ message: ev.target.value })
  }

  sendMessage (e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
  }

  toggleCollapse (event) {
    let box = ReactDOM.findDOMNode(this).children[0],
        boxBody = ReactDOM.findDOMNode(this).children[0].children[1],
        icon = event.currentTarget.children[0]
    toggleBoxCollapse(box, boxBody, icon)
  }

  removeBox (event) {
    let box = ReactDOM.findDOMNode(this).children[0]
    removeBox(box)
  }

  toggleChat () {
    let box = ReactDOM.findDOMNode(this).children[0]

    if(box.className.indexOf('direct-chat-contacts-open') === -1){
      box.className += ' direct-chat-contacts-open'
      box.querySelector('.direct-chat-contacts').className += ' zindex'
    }else{
      box.className = box.className.replace(/ direct-chat-contacts-open/g,'')
      setTimeout(() => {
        box.querySelector('.direct-chat-contacts').className = box.querySelector('.direct-chat-contacts').className.replace(/ zindex/g, '')
      }, 600)
    }
  }

  render () {
    let borderClass = ''
    let a = React.Children.map(this.props.children, (child) => {
      return child
    })
    if (this.props.border == true) {
      borderClass = 'box-solid'
    }

    return (
      <div className={"col-md-"+this.props.width}>
        {/* DIRECT CHAT PRIMARY */}
        <div className={"box " + this.props.headerTheme + " direct-chat " + this.props.chatTheme + " " + borderClass}>
          <div className="box-header with-border">
          <h3 className="box-title">{this.props.title}</h3>
          <div className="box-tools pull-right">
            <span data-toggle="tooltip" title="" className={"badge "+this.props.notificationTheme}
              data-original-title={this.props.notifications+ " New Messages"}>
              {this.props.notifications}
            </span>
            <button className="btn btn-box-tool" data-widget="collapse" onClick={this.toggleCollapse}>
              <i className="fa fa-minus"></i>
            </button>
            <button className="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts" onClick={this.toggleChat}>
              <i className="fa fa-comments"></i>
            </button>
            <button className="btn btn-box-tool" data-widget="remove" onClick={this.removeBox}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            {this.props.children}
          </div>
          {/* /.box-body */}
          <div className="box-footer">
            <form onSubmit={this.sendMessage}>
              <div className="input-group">
                <input type="text" name="message" placeholder="Type Message ..." className="form-control" onChange={this.changeMessage} />
                <span className="input-group-btn">
                  <button type="submit" className={"btn btn-flat "+this.props.buttonTheme}>Send Message</button>
                </span>
              </div>
            </form>
          </div>
          {/* /.box-footer*/}
        </div>
        {/*/.direct-chat */}
      </div>
    )
  }
}

ChatBox.defaultProps = {
  width: 3,
  headerTheme: 'box-primary',
  notificationTheme: 'bg-light-blue',
  chatTheme: 'direct-chat-primary',
  buttonTheme: 'btn-primary',
  title: 'Chat Box',
  notifications: 0,
  sendMessage: ()=>{}
}

ChatBox.propTypes = {
  width: PropTypes.number,
  notifications: PropTypes.number,
  sendMessage: PropTypes.func
}

export default ChatBox
