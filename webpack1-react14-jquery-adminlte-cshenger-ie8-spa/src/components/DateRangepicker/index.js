import React, { Component, PropTypes } from 'react'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

class DateRangepicker extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.$el = $(this.el)
    setTimeout(() => {
      this.props.time ?
        this.$el.daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' }) :
        this.$el.daterangepicker()
    }, 100)
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className="input-group">
        <div className="input-group-addon">
          <i className={"fa "+this.props.icon}></i>
        </div>
        <input type="text" className="form-control pull-right" data-timm={this.props.time} ref={el => this.el = el} />
      </div>
    )
  }
}

DateRangepicker.propTypes = {
  time: PropTypes.bool
}

DateRangepicker.defaultProps = {
  time: false
}

export default DateRangepicker
