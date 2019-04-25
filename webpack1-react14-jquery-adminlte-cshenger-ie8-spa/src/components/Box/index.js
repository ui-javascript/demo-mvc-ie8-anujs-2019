import React, { Component, PropTypes } from 'react'
import BoxTool from './BoxTool'

class Box extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let boxType = '', borderClass = '', boxToolsContainer, boxTools = [], loadingState, footer;

    if (this.props.border === true) {
      borderClass = 'box-solid'
    }

    if (this.props.boxTools) {
      this.props.boxTools.map((tool, index) => {
        boxTools.push(<BoxTool key={index} toolType={tool} containerClass="box" />)
      })
      boxToolsContainer = <div className="box-tools pull-right">{boxTools}</div>
    }

    if (this.props.loading === true) {
      loadingState =
        <div className="overlay">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
    }

    if (this.props.collapsed) {
      boxType = "collapsed-box"
    }

    if (this.props.footer) {
      footer = <div className="box-footer">{this.props.footer}</div>
    }

    return (
      <div className={"col-md-"+this.props.width+" col-sm-6 col-xs-12"}>
        <div className={"box "+this.props.theme+" "+borderClass+ " color-palette-box "+boxType}>
          <div className="box-header with-border">
            {this.props.headerIcon ? <i className={"fa "+this.props.headerIcon}></i> : ''}
            <h3 className="box-title">{this.props.headerMarkup} {this.props.title}</h3>
            {boxToolsContainer}
          </div>
          <div className="box-body">
            {this.props.content}
            {this.props.children}
          </div>
          {footer}
          {/* /.box-body */}
          {loadingState}
        </div>
      </div>
    )
  }
}

Box.defaultProps = {
  width: 3,
  collapsed: false,
  theme: 'box-default',
  loading: false,
  border: true,
  title: 'Default title',
  content: ''
}

Box.propTypes = {
  width: PropTypes.number,
  collapsed: PropTypes.bool,
  loading: PropTypes.bool,
  border: PropTypes.bool,
  boxTools: PropTypes.array
}

export default Box
