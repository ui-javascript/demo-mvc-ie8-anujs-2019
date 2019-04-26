import React, {Component} from 'react';
import {Select} from 'antd';
import myAxios from "../../../utils/myAxios";

const Option = Select.Option;

class MySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            options: props.selectOptions,
        };
    }

    componentDidMount() {
        if (!this.state.options && this.props.optionsUrl) {
            myAxios.get(this.props.optionsUrl, {params: this.props.optionsQueryParams})
                .then(data => {
                    this.setState({options: data && this.props.optionsDataFilter ? this.props.optionsDataFilter(data) : data})
                })
                .catch(error => {
                    this.setState({value: undefined});
                })
        }
    }


    componentWillReceiveProps(nextProps) {
        if (!nextProps.selectOptions) {
            return;
        }
        this.setState({
            options: nextProps.selectOptions
        })
    }

    render() {
        const value = this.props.value !== undefined && this.props.value !== null ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : (value) => {
            this.setState({value})
        };
        const options = this.state.options ? this.state.options.map(item => <Option
            value={item.value} key={item.value}>{item.label}</Option>) : null;
        return (
            <Select value={this.state.options && value !== undefined && value !== null  && value !== 'undefined'? value + '' : undefined}
                    placeholder={this.props.placeholder ? this.props.placeholder : '点击选择'}
                    onChange={onChange} allowClear showSearch optionFilterProp='children'
                    multiple={this.props.multiple} size={this.props.size}
                    style={this.props.style ? this.props.style : {width: '100%'}}>
                {options}
            </Select>
        )
    }
}

export default MySelect;