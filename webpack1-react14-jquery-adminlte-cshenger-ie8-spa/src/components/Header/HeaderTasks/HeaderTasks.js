import React, { Component, PropTypes } from 'react'
import TasksItem from './TasksItem'
import { toggleDropdown } from '../../../services/common-func'

class HeaderTasks extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    toggleDropdown(this.dropdown)
  }

  render () {
    let tasks = this.props.tasks

    return (
      /*<!-- Tasks Menu -->*/
      <li className="dropdown tasks-menu" ref={(dropdown) => {this.dropdown = dropdown}}>
        {/*<!-- Menu Toggle Button -->*/}
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-flag-o"></i>
          <span className={"label " + this.props.theme}>{tasks.length}</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have {tasks.length} tasks</li>
          <li>
            {/*<!-- Inner menu: contains the tasks -->*/}
            <ul className="menu">
              {tasks.map((taskDetails, iteartor) => {
                return (
                  <TasksItem
                    key={iteartor}
                    percentage={taskDetails.percentage}
                    subject={taskDetails.subject}  />
                )
              })}
            </ul>
          </li>
          <li className="footer">
            <a href="#">View all tasks</a>
          </li>
        </ul>
      </li>
    )
  }
}

HeaderTasks.defaultProps = {
  theme: 'label-danger'
}

export default HeaderTasks
