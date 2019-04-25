import React, { Component, PropTypes } from 'react'

class Progressbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div
        className={"progress"
          + (this.props.active ? " active" : "")
          + (this.props.vertical ? " vertical" : "")
          + (this.props.sm ? " progress-sm" : "")
          + (this.props.xs ? " progress-xs" : "")
          + (this.props.xxs ? " progress-xxs" : "")}>
        <div className={"progress-bar"
          + " progress-bar-"+this.props.theme
          + (this.props.striped ? " progress-bar-striped" : "")}
          role="progressbar"
          aria-valuenow={this.props.value}
          aria-valuemin="0"
          aria-valuemax={this.props.valuemax}
          style={ this.props.vertical ? {height: this.props.value+"%"} : {width: this.props.value+"%"}}>
          <span className="sr-only">{this.props.value+"%"} Complete</span>
        </div>
      </div>
    )
  }
}

Progressbar.propTypes = {
  active: PropTypes.bool,
  vertical: PropTypes.bool,
  sm: PropTypes.bool,
  xs: PropTypes.bool,
  xxs: PropTypes.bool,
  theme: PropTypes.string,
  striped: PropTypes.bool,
  value: PropTypes.number,
  valuemax: PropTypes.number,
  vertical: PropTypes.bool
}

Progressbar.defaultProps = {
  theme: 'primary',
  valuemax: 100
}

export default Progressbar
