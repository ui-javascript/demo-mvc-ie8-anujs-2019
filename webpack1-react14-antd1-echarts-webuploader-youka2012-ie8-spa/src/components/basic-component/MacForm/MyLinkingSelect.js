import React, {Component} from 'react';
import {Select} from 'antd';
import myAxios from "../../../utils/myAxios";

const Option = Select.Option;

class MyLinkingSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue ? props.defaultValue : [],
            options: props.selectOptions
        };
    }

    componentDidMount() {
        if (!this.state.options && this.props.optionsUrl) {
            myAxios.get(this.props.optionsUrl, {params:this.props.optionsQueryParams})
                .then(data => {
                    data = this.props.optionsDataFilter ? this.props.optionsDataFilter(data) : data;
                    this.setState({options: data})
                })
                .catch(error => {
                    this.setState({value: undefined});
                })
        }
    }

    render() {
        const currentValue = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : null;

        let options = this.state.options;
        // const currentValue = this.state.value;
        const subValue = currentValue[0];
        const secValue = currentValue.slice(1);
        let linkOptions = options ? {} : null;
        const subSelectOptions = options ? options.map(item => {
            linkOptions[item.value] = item.children && Object.prototype.toString.call(item.children) === '[object Array]' && item.children.map(op =>
                <Option value={op.value} key={op.value} disabled={!!op.disabled}>{op.label}</Option>);
            return <Option value={item.value} key={item.value} disabled={!!item.disabled}>{item.label}</Option>
        }) : null;

        return (
            <div>
                <Select value={options && subValue !== undefined && subValue !== null && subValue !== 'undefined' ? subValue : undefined} allowClear  placeholder={this.props.placeholder?this.props.placeholder:''}
                        onChange={(value) => {
                            const newValue = [value];
                            if (onChange) {
                                onChange(newValue);
                            } else {
                                this.setState({value: newValue});
                            }
                        }}
                        showSearch optionFilterProp='children' style={this.props.style} size={this.props.size}>
                    {subSelectOptions}
                </Select>
                <span className='ant-form-item-label'>{this.props.secondLabel}:&nbsp;&nbsp;</span>
                <Select value={options && subValue !== undefined && subValue !== null && subValue !== 'undefined' ? secValue : undefined} allowClear  placeholder={this.props.placeholder?this.props.placeholder:''}
                        onChange={(value) => {
                            if (subValue !== undefined && subValue !== '') {
                                const newValue = [subValue].concat(value);
                                if (onChange) {
                                    onChange(newValue);
                                } else {
                                    this.setState({value: newValue});
                                }
                            }
                        }}
                        showSearch optionFilterProp='children' multiple={this.props.multiple} style={this.props.style}
                        size={this.props.size}>
                    {options && subValue !== undefined && subValue != 'undefined' ? linkOptions[currentValue[0]] : null}
                </Select>
            </div>
        )
    }
}

export default MyLinkingSelect;