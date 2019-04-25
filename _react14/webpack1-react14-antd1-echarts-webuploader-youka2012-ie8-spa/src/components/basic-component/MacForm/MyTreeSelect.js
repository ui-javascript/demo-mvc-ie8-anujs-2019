import React, {Component} from 'react';
import {TreeSelect} from 'antd';
import myAxios from '../../../utils/myAxios';

class MyTreeSelect extends Component {
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

    render() {
        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : (value) => {
            this.setState({value})
        };
        return (
            <TreeSelect value={this.state.options && value !== undefined && value !== null && value !== 'undefined' ? value + '' : undefined} treeData={this.state.options} allowClear
                        placeholder='请选择' style={this.props.style} dropdownStyle={this.props.dropdownStyle}
                        onChange={onChange}/>
        )
    }
}

export default MyTreeSelect;