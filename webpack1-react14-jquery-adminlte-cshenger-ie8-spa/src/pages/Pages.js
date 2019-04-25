import React, { Component, PropTypes } from 'react'

export default (WrapperComponent) => {
  class NewComponent extends Component {
    constructor () {
      super()
    }

    componentDidMount () {
      this.getConWrapperHeight()
      window.onresize = () => {
        this.getConWrapperHeight()
      }
    }

    getConWrapperHeight () {
      return this.contentWrapper.style.minHeight = (document.documentElement.clientHeight - 101) + 'px'
    }

    render () {
      return (
        <div className="content-wrapper" ref={(wrapper) => { this.contentWrapper = wrapper }}>
          <WrapperComponent />
        </div>
      )
    }
  }

  return NewComponent
}
