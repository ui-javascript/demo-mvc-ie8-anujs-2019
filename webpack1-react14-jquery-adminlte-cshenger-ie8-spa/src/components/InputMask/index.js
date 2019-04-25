import React, { Component, PropTypes } from 'react'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('./input-mask/jquery.inputmask.js')
require('./input-mask/jquery.inputmask.date.extensions.js')
require('./input-mask/jquery.inputmask.extensions.js')

class InputMask extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.$el = $(this.el)
    switch (this.props.mask) {
      case "calendar-dd":
        this.$el.inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
        break;
      case "calendar-mm":
        this.$el.inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });
        break;
      case "phone-us":
        this.$el.inputmask({'mask': '(999) 999-9999', 'placeholder': '(___) ___-____'});
        break;
      case "phone-usin":
        this.$el.inputmask({'mask': ['999-999-9999', '+099 99 99 9999[9]-9999'], 'placeholder': '___-____-____'});
        break;
      case "ip":
        this.$el.inputmask('ip', { 'placeholder': '___.___.___.___' });
        break;
    }

    this.$el.on('chnage', this.handleChange)
  }

  componentWillUnmount () {
    this.$el.inputmask('remove')
    this.$el.off('change', this.handleChange)
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    return (
      <div className="input-group">
        <div className="input-group-addon">
          <i className={"fa "+this.props.icon}></i>
        </div>
        <input type="text" className="form-control" data-mask={this.props.mask} ref={el => this.el = el} />
      </div>
    )
  }
}

export default InputMask
