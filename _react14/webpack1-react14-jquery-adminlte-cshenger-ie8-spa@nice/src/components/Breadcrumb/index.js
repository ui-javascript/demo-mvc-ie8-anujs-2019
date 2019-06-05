import React, { Component, PropTypes } from 'react'

class Breadcrumb extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let breads = this.props.breads

    return (
      <ol className="breadcrumb">
        {
          breads.map((menu, item) => {
            if (menu.icon) {
              return <li key={item}><a href={menu.url}><i className={menu.icon}></i> {menu.name}</a></li>
            } else {
              if (menu.active) {
                return <li key={item} className="active">{menu.name}</li>
              } else {
                return <li key={item}><a href={menu.url}>{menu.name}</a></li>
              }
            }
          })
        }
      </ol>
    )
  }
}

export default Breadcrumb
