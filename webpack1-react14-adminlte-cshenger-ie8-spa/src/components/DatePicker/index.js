import React, { Component, PropTypes } from 'react'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('./date/bootstrap-datepicker.min.css');
require('./date/bootstrap-datepicker.min.js');

class DatePicker extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.$el = $(this.el)
    this.$el.datepicker({ autoclose: true })
    this.$el.on('change', this.handleChange)
  }

  componentWillUnmount () {
    this.$el.datepicker('destroy')
    this.$el.off('change', this.handleChange)
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    return (
      <div className="input-group date">
        <div className="input-group-addon">
          <i className="fa fa-calendar"></i>
        </div>
        <input type="text" className="form-control pull-right" ref={el => this.el = el} />
      </div>
    )
  }
}

export default DatePicker
