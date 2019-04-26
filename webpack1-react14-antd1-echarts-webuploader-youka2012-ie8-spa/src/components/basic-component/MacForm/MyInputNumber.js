import React, {Component} from 'react';
import {InputNumber} from 'antd';

class MyInputNumber extends Component {
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
            <InputNumber value={value} onChange={onChange} {...this.props.remainderProps}/>
        )
    }
}

export default MyInputNumber;