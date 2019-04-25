import React, { Component, PropTypes } from 'react'

class SidebarSearch extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      /*<!-- search form (Optional) -->*/
      <form action={this.props.action} method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Search..." />
          <span className="input-group-btn">
            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
          </span>
        </div>
      </form>
      /*<!-- /.search form -->*/
    )
  }
}

export default SidebarSearch
