import React, { Component, PropTypes } from 'react'
import { findClosestElement, toggleBoxCollapse, removeBox, initialize } from '../../services/common-func'

class BoxTool extends Component {
  constructor (props) {
    super(props)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.removeBox = this.removeBox.bind(this)
  }

  toggleCollapse (event) {
    let box = findClosestElement(event.currentTarget, this.props.containerClass),
        boxBody = box.children[1],
        icon = event.currentTarget.children[0]

    toggleBoxCollapse(box, boxBody, icon)
  }

  removeBox (event) {
    let box = findClosestElement(event.currentTarget, this.props.containerClass)
    removeBox(box)
  }

  edit () {
    this.props.callback()
  }

  render () {
    var button = '', that = this;

    switch (this.props.toolType) {
      case 'expand':
        return <button className="btn btn-box-tool" data-widget="expand" onClick={this.toggleCollapse}><i className="fa fa-plus"></i></button>
      case 'collapse':
        return <button className="btn btn-box-tool" data-widget="collapse" onClick={this.toggleCollapse}><i className="fa fa-minus"></i></button>
      case 'remove':
        return <button className="btn btn-box-tool" data-widget="remove" onClick={this.removeBox}><i className="fa fa-times"></i></button>
    }
  }
}

export default BoxTool
