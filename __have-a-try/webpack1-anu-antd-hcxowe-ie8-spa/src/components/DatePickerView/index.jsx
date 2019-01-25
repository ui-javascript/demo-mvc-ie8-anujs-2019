import React, { Component } from 'react'
import { DatePicker } from 'antd'
import './index.less'

const MonthPicker = DatePicker.MonthPicker
const RangePicker = DatePicker.RangePicker

class DatePickerView extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onChange1 = this.onChange1.bind(this)
        this.disabledDate = this.disabledDate.bind(this)
    }

    onChange(value, dateString) {
        console.log(value, dateString);
    }

    onChange1(value, dateString) {
        console.log('From: ', value[0], ', to: ', value[1]);
        console.log('From: ', dateString[0], ', to: ', dateString[1]);
    }

    disabledDate(current) {
        return current && current.getTime() > Date.now();
    }

    render() {
        return (
            <div class="datepicker-wrap">
                <div>
                    <DatePicker disabledDate={this.disabledDate} size="large" showTime defaultValue="2018-06-29 10:10:10" format="yyyy-MM-dd HH:mm:ss" onChange={this.onChange} />
                </div>
                <div>
                    <MonthPicker defaultValue="2018-06" />
                </div>
                <div>
                    <RangePicker style={{ width: 184 }} onChange={this.onChange1} />
                    <br />
                    <RangePicker showTime format="yyyy/MM/dd HH:mm:ss" onChange={this.onChange1} />
                </div>
            </div>
        )
    }
}

export default DatePickerView