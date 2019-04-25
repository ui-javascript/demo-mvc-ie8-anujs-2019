import React, { Component, PropTypes } from 'react'

class TasksItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'progress-bar-red'
    }
  }

  render () {
    let stylePercentage = {
      width: this.props.percentage + '%'
    }
    let theme = this.state.theme
    let percentage = this.props.percentage

    if (percentage < 21) {
      theme = 'progress-bar-red'
    } else if (percentage > 20 && percentage < 41) {
      theme = 'progress-bar-yellow'
    } else if (percentage > 40 && percentage < 61) {
      theme = 'progress-bar-green'
    } else if (percentage > 60) {
      theme = 'progress-bar-aqua'
    }

    return (
      <li>{/*<!-- Task item -->*/}
        <a href={this.props.href}>
          {/*<!-- Task title and progress text -->*/}
          <h3>
            {this.props.subject}
            <small className="pull-right">{this.props.percentage+'%'}</small>
          </h3>
          {/*<!-- The progress bar -->*/}
          <div className="progress xs">
            {/*<!-- Change the css width attribute to simulate progress -->*/}
            <div className={"progress-bar " + theme} style={stylePercentage} role="progressbar"
                aria-valuenow={this.props.percentage} aria-valuemin="0" aria-valuemax="100">
              <span className="sr-only">{this.props.percentage+'%'} Complete</span>
            </div>
          </div>
        </a>
      </li>
      /*<!-- end task item -->*/
    )
  }
}

export default TasksItem
