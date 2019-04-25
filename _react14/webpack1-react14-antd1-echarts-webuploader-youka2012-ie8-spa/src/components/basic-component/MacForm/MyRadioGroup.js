import React, {Component} from 'react';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;

class MyRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        };
        this.radios = props.selectOptions.map(item => <Radio value={item.value} key={item.value}>{item.label}</Radio>);
    }

    render() {
        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : value => {
            this.setState({value});
        };
        return (
            <RadioGroup value={this.props.selectOptions && value !== undefined && value !== null  && value !== 'undefined'? value + '' : undefined} options={this.props.selectOptions}
                        onChange={e => {
                            onChange(e.target.value);
                        }}
            >
                {this.radios}
            </RadioGroup>
        )
    }
}

export default MyRadioGroup;