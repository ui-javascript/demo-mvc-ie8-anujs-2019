import React, {Component} from 'react';
import {Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;

class MyCheckboxGroup extends Component {
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
            <CheckboxGroup value={value} options={this.props.selectOptions}
                           onChange={onChange}
            />
        )
    }
}

export default MyCheckboxGroup;