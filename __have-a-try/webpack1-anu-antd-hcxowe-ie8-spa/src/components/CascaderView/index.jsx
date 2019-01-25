import React, { Component } from 'react'
import { Cascader } from 'antd'
import './index.less'

const CityOptions = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [{
            value: 'hangzhou',
            label: '杭州',
            children: [{
                value: 'xihu',
                label: '西湖',
            }],
        }],
    }, 
    {
        value: 'jiangsu',
        label: '江苏',
        disabled: true,
        children: [{
            value: 'nanjing',
            label: '南京',
            children: [{
                value: 'zhonghuamen',
                label: '中华门',
            }],
        }],
    }
]
  

class CascaderView extends Component {
    constructor(props) {
        super(props)

        this.state= {

        }

        this.onChange = this.onChange.bind(this)
        //this.enterIconLoading = this.enterIconLoading.bind(this)
    }

    onChange(value) {
        console.log(value);
    }

    render() {
        return (
            <div class="cascader-wrap">
                <div>
                    <Cascader expandTrigger="hover" defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={CityOptions} onChange={this.onChange} placeholder="请选择地区" />
                </div>
            </div>
        )
    }
}

export default CascaderView