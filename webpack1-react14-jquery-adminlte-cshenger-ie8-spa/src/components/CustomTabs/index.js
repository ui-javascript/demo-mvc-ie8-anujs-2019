import React, { Component, PropTypes, Children } from 'react'

class CustomTabsMuted extends Component {
  render () {
    return (
      <li className="pull-right"><a href={this.props.url} className="text-muted"><i className={"fa "+this.props.icon}></i></a></li>
    )
  }
}
CustomTabsMuted.defaultProps = {
  url: "javascript:void(0);",
  icon: "fa-gear"
}

class CustomTabsHeader extends Component {
  render () {
    return (
      <li className="pull-left header"><i className={"fa "+this.props.icon}></i> {this.props.title}</li>
    )
  }
}
CustomTabsHeader.defaultProps = {
  icon: "fa-th"
}

class CustomTabsTab extends Component {
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class CustomTabs extends Component {
  constructor(props) {
    super(props)
    this.state = { currentIndex: this.props.activeIndex }
    this.getTitleActie = this.getTitleActie.bind(this)
    this.getContentActive = this.getContentActive.bind(this)
  }

  getTitleActie (index) {
    return index == this.state.currentIndex ? "active" : ""
  }

  getContentActive (index) {
    return index == this.state.currentIndex ? "tab-pane active" : "tab-pane"
  }

  render () {
    return (
      <div className="nav-tabs-custom">
        <ul className={"nav nav-tabs" + (this.props.pullRight ? " pull-right" : "")}>
          {Children.map(this.props.children, (list, index) => {
            return (
              <li className={this.getTitleActie(index)}>
                <a href="javascript:void(0);" onClick={() => this.setState({currentIndex: index})}>{list.props.title}</a>
              </li>
            )
          })}
          {this.props.dropdown}
          {this.props.muted}
          {this.props.header}
        </ul>
        <div className="tab-content">
          {Children.map(this.props.children, (pane, index) => {
            return (
              <div className={this.getContentActive(index)}>{pane}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

CustomTabs.propTypes = {
  activeIndex: PropTypes.number,
  pullRight: PropTypes.bool
}
CustomTabs.defaultProps = {
  activeIndex: 0,
  pullRight: false
}

export default CustomTabs
export { CustomTabsTab, CustomTabsMuted, CustomTabsHeader }
