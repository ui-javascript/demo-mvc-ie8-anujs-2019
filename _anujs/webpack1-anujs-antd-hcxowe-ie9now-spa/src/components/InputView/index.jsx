import React, { Component } from 'react'
import { Input, InputNumber, Radio, Rate, Select, Slider, Switch, Icon, TimePicker, Transfer, TreeSelect, Upload, message, Button } from 'antd'
import HInput from '../../base/HInput'
import './index.less'

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

let children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const props = {
    name: 'file',
    action: '/upload.do',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功。`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败。`);
      }
    },
};

class InputView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            baseValue: 'ddd',
            Rvalue: 1,
            mockData: [],
            targetKeys: [],
            treeValue: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.handleTransferChange = this.handleTransferChange.bind(this)
        this.onTreeChange = this.onTreeChange.bind(this)
    }

    componentDidMount() {
        this.getMock();
    }

    getMock() {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i,
                title: `内容${i + 1}`,
                description: `内容${i + 1}的描述`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }

    handleTransferChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
    }

    handleInputChange(e) {
        console.log(e.target.value)
        this.setState({
            baseValue: e.target.value
        })
    }

    onTreeChange(value) {
        console.log(arguments);
        this.setState({ treeValue: value });
    }

    onNumChange(value) {
        console.log('changed', value);
    }

    onRadioChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            Rvalue: e.target.value,
        });
    }

    onShowChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }

    onSelectChange(value) {
        console.log(`selected ${value}`);
    }
      
    onTimeChange(time, timeString) {
        console.log(time, timeString);
    }

    render() {
        return (
            <div class="input-wrap">
                <div>
                    <label>{this.state.baseValue}</label>
                    <Input style={{width: '100px'}} value={this.state.baseValue} onChange={this.handleInputChange} placeholder="基本使用" />

                    <input value={this.state.baseValue} onChange={this.handleInputChange} />

                    <textarea value={this.state.baseValue} onChange={this.handleInputChange} ></textarea>

                    <HInput style={{width: '250px'}} onChange={this.handleInputChange} />
                </div>

                <div>
                    <InputNumber min={1} max={1000} step={0.1} defaultValue={1.2} onChange={this.onNumChange} />
                </div>

                <div>
                    <RadioGroup onChange={this.onRadioChange} value={this.state.Rvalue}>
                        <Radio key="a" value={1}>A</Radio>
                        <Radio key="b" value={2}>B</Radio>
                        <Radio key="c" value={3}>C</Radio>
                        <Radio key="d" value={4}>D</Radio>
                    </RadioGroup>
                </div>
                <div>
                    <RadioGroup onChange={this.onShowChange} defaultValue="a">
                    <RadioButton value="a">杭州</RadioButton>
                    <RadioButton value="b">上海</RadioButton>
                    <RadioButton value="c">北京</RadioButton>
                    <RadioButton value="d">成都</RadioButton>
                    </RadioGroup>
                </div>
                <div style={{ marginTop: 16 }}>
                    <RadioGroup onChange={this.onShowChange} defaultValue="a">
                    <RadioButton value="a">杭州</RadioButton>
                    <RadioButton value="b" disabled>上海</RadioButton>
                    <RadioButton value="c">北京</RadioButton>
                    <RadioButton value="d">成都</RadioButton>
                    </RadioGroup>
                </div>
                <div style={{ marginTop: 16 }}>
                    <RadioGroup disabled onChange={this.onShowChange} defaultValue="a">
                    <RadioButton value="a">杭州</RadioButton>
                    <RadioButton value="b">上海</RadioButton>
                    <RadioButton value="c">北京</RadioButton>
                    <RadioButton value="d">成都</RadioButton>
                    </RadioGroup>
                </div>
                <div>
                    <Rate />    
                </div>
                <div>
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.onSelectChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                    <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Select tags style={{ width: '100%' }} searchPlaceholder="标签模式" onChange={this.onSelectChange}>
                        {children}
                    </Select>
                </div>
                <div>
                    <Slider defaultValue={30} />
                    <Slider range defaultValue={[20, 50]} />
                    <Slider range defaultValue={[20, 50]} disabled />
                </div>
                <div>
                    <Switch defaultChecked={false} />
                    <Switch checkedChildren="开" unCheckedChildren="关" />
                    <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                </div>
                <div>
                    <TimePicker onChange={this.onTimeChange} />
                </div>
                <div>
                    <Transfer
                        dataSource={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleTransferChange}
                        render={item => item.title}
                    />
                </div>
                <div>
                <TreeSelect style={{ width: 300 }}
                    value={this.state.treeValue}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onTreeChange}
                >
                    <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                        <TreeNode value="leaf1" title="my leaf" key="random" />
                        <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                    </TreeNode>
                    </TreeNode>
                </TreeSelect>
                </div>
                <div>
                    <Upload {...props}>
                        <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload>
                </div>
            </div>
        )
    }
}

export default InputView