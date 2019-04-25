import React, {Component} from 'react';
import {Input} from 'antd';

class MyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue !== undefined ? props.defaultValue : '',
        };

    }

    render() {
        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : (value) => {
            this.setState({value})
        };
        return (
            <Input disabled={this.props.disabled} type={this.props.type ? this.props.type : 'text'} style={this.props.style}
                   value={value} {...this.props.remainderProps} size={this.props.size} placeholder={this.props.placeholder}
                   onChange={e => {
                       onChange(e.target.value);
                   }}
            />
        )
    }
}

export default MyInput;