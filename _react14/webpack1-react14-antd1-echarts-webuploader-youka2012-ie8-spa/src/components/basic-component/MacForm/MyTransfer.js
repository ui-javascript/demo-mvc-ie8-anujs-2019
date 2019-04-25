import React, {Component} from 'react';
import {Transfer} from 'antd';
import myAxios from "../../../utils/myAxios";

class MyTransfer extends Component {
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
                    data = data && this.props.optionsDataFilter ? this.props.optionsDataFilter(data) : data;
                    if (this.props.fullValueResult) {
                        let dataSourceMap = {};
                        data.forEach(item => {
                            dataSourceMap[item.key] = item;
                        });
                        this.dataSourceMap = dataSourceMap;
                    }
                    this.setState({options: data})
                })
                .catch(error => {
                    this.setState({value: null});
                })
        }
    }

    render() {
        console.log('MyTransfer props', this.props);
        console.log('MyTransfer state', this.state);

        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const isFullValueResult = !!this.props.fullValueResult;
        let targetKeys = [];
        if (this.state.options && value) {
            if (isFullValueResult && Object.prototype.toString.call(value) === '[object Array]') {
                value.forEach(item => {
                    targetKeys.push(item.key);
                })
            } else {
                targetKeys = value;
            }
        }
        const onChange = this.props.onChange ? this.props.onChange : value => {
            this.setState({value});
        };
        return (
            <Transfer dataSource={this.state.options}
                      titles={['候选项', '已选项']}
                      showSearch
                      listStyle={this.props.listStyle}
                      filterOption={(inputValue, option) => option.label.indexOf(inputValue) > -1}
                      targetKeys={targetKeys}
                      onChange={valueKeys => {
                          const dataSourceMap = this.dataSourceMap;
                          if (dataSourceMap && isFullValueResult) {
                              const newValue = valueKeys.map(key => dataSourceMap[key]);
                              onChange(newValue);
                          } else {
                              onChange(valueKeys);
                          }
                      }}
                      render={item => item.label}
                      {...this.props.remainderProps}
            />
        )
    }
}

export default MyTransfer;