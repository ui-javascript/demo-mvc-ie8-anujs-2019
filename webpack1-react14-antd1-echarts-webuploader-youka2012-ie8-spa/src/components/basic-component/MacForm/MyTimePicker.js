import React, {Component} from 'react';
import {TimePicker} from 'antd';

class MyTimePicker extends Component {
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
            <TimePicker value={value} onChange={(date,dateString)=>{onChange(dateString)}} {...this.props.remainderProps}/>
        )
    }
}

export default MyTimePicker;