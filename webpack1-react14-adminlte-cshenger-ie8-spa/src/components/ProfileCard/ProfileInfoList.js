import React, { Component, PropTypes } from 'react'

class ProfileInfoList extends Component {
  render () {
    let listItems = this.props.list.map((info, iterator) => {
      return (
        <li key={iterator}>
          <a href={info.link}>
            {info.description}
            <span className={"pull-right badge " + info.badgeTheme}>
              {info.stats}
            </span>
          </a>
        </li>
      )
    })

    return (
      <ul className="nav nav-stacked">
        {listItems}
      </ul>
    )
  }
}

export default ProfileInfoList
