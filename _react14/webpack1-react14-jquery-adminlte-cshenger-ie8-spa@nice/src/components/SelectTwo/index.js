import React, { Component, PropTypes } from 'react'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('./select2/select2.min.css');
require('./select2/select2.full.min.js');

class SelectTwo extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.$el = $(this.el)
    this.$el.select2({ placeholder: this.props.placeholder })
    // this.$el.on('change', this.handleChange)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.on('change', this.handleChange)
    }
  }

  componentWillUnmount () {
    this.$el.off('change', this.handleChange)
    this.$el.select2('destroy');
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    return (
      <div>
        <select className="form-control select2"
          ref = {el => this.el = el}
          disabled = {this.props.disabled ? true : false}
          multiple = {this.props.multiple ? true : false}
          dataPlaceholder = {this.props.placeholder ? this.props.placeholder : null}>
          {this.props.children}
        </select>
      </div>
    )
  }
}

export default SelectTwo
