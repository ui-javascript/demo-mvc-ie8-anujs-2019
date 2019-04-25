import React, { Component, PropTypes } from 'react'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

class DateRangebtn extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.$el = $(this.el)
    setTimeout(() => {
      this.$el.daterangepicker(
        {
          ranges   : {
            'Today'       : [moment(), moment()],
            'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month'  : [moment().startOf('month'), moment().endOf('month')],
            'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          startDate: moment().subtract(29, 'days'),
          endDate  : moment()
        },
        ((start, end) => {
          this.$el.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
        })
      )
    }, 100)
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className="input-group">
        <button type="button" className="btn btn-default pull-right" ref={el => this.el = el}>
          <span>
            <i className="fa fa-calendar"></i> Date range picker
          </span>
          <i className="fa fa-caret-down"></i>
        </button>
      </div>
    )
  }
}

export default DateRangebtn
