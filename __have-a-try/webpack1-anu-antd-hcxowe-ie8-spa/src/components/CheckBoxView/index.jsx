import React, { Component } from 'react'
import { Checkbox, Button } from 'antd'
import './index.less'

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '橘', value: 'Orange' },
];
const optionsWithDisabled = [
    { label: '苹果', value: 'Apple' },
    { label: '梨', value: 'Pear' },
    { label: '橘', value: 'Orange', disabled: false },
];

class CheckBoxView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: true,
            disabled: false
        }

        this.onChange = this.onChange.bind(this)
        this.onChange1 = this.onChange1.bind(this)
        this.onChange2 = this.onChange2.bind(this)
        this.toggleChecked = this.toggleChecked.bind(this)
        this.toggleDisable = this.toggleDisable.bind(this)
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    toggleChecked() {
        this.setState({ checked: !this.state.checked });
    }

    toggleDisable() {
        this.setState({ disabled: !this.state.disabled });
    }
    onChange1(e) {
        console.log('checked = ', e.target.checked);
        this.setState({
            checked: e.target.checked,
        });
    }

    onChange2(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    render() {
        const label = `${this.state.checked ? '选中' : '取消'}-${this.state.disabled ? '不可用' : '可用'}`;

        return (
            <div class="checkbox-wrap">
                <div>
                    <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
                    <Checkbox defaultChecked={false} disabled />
                    <Checkbox defaultChecked disabled />

                </div>

                <div>
                    <p style={{ marginBottom: '20px' }}>
                        <Checkbox checked={this.state.checked} disabled={this.state.disabled} onChange={this.onChange1}>{label}</Checkbox>
                    </p>
                    <p>
                        <Button type="primary" size="small" onClick={this.toggleChecked}>
                            {!this.state.checked ? '选中' : '取消'}
                        </Button>
                        <Button style={{ marginLeft: '10px' }} type="primary" size="small" onClick={this.toggleDisable}>
                            {!this.state.disabled ? '不可用' : '可用'}
                        </Button>
                    </p>
                </div>

                <div>
                    <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={this.onChange2} />
                    <br />
                    <CheckboxGroup options={options} defaultValue={['Pear']} onChange={this.onChange2} />
                    <br />
                    <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={this.onChange2} />
                </div>
            </div>
        )
    }
}

export default CheckBoxView