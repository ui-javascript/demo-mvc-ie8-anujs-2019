import React, {Component} from 'react';
import {DatePicker} from 'antd';

class MyDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        };

    }

    render() {
        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : (value) => {
            this.setState({value})
        };
        return (
            <DatePicker {...this.props.remainderProps} value={value} onChange={(date,dateString)=>{onChange(dateString)}}/>
        )
    }
}

export default MyDatePicker;