import React, { Component, PropTypes } from 'react'

class Comment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="box-comment">
        {/* User image */}
        <img className="img-circle img-sm" src={this.props.displayPicture} alt="user image" />
        <div className="comment-text">
          <span className="username">
            {this.props.displayName}
            <span className="text-muted pull-right">{this.props.date}</span>
          </span>
          {/* /.username */}
          {this.props.content}
        </div>
        {/* /.comment-text*/}
      </div>
    )
  }
}

Comment.defaultProps = {
  content: 'sample comment',
  displayName: 'John Doe',
  displayPicture: '../../public/dist/imgs/user4-128x128.jpg',
  date: '8:03 PM Today'
}

export default Comment
