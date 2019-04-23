import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Select } from 'antd'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;

function noop() {
  return false;
}

let BasicDemo = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    });
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          <Input {...passwdProps} type="password" autoComplete="off"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="备注"
        >
          <Input {...textareaProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

BasicDemo = createForm()(BasicDemo);

let Demo1 = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    },
  
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="用户名"
            >
                <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="密码"
            >
                <Input type="password" {...getFieldProps('pass', { initialValue: '' })} placeholder="请输入密码" />
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="您的性别"
            >
                <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
                <Radio value="male">男的</Radio>
                <Radio value="female">女的</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="备注"
                help="随便写点什么"
            >
                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark', { initialValue: '' })} />
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<span>卖身华府 <Tooltip title="我为秋香"><Icon type="question-circle-o" /></Tooltip></span>}
            >
                <Checkbox {...getFieldProps('agreement', { initialValue: false, valuePropName: 'checked' })}>同意</Checkbox>
            </FormItem>
            <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
            </Form>
        );
    },
});
  
Demo1 = Form.create()(Demo1);

let Demo = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    },
  
    render() {
        const { getFieldProps } = this.props.form
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormItem label="账户">
                    <Input placeholder="请输入账户名" {...getFieldProps('userName') } />
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" placeholder="请输入密码" {...getFieldProps('password') } />
                </FormItem>
                <FormItem>
                    <Checkbox {...getFieldProps('agreement') }>记住我</Checkbox>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
        );
    },
});

Demo = Form.create()(Demo);

class FormView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: ''
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    handleSelectChange(value) {
        console.log(`selected ${value}`);
    }
    
    onInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })

        console.log(e)
    }

    render() {
        return (
            <div class="form-wrap">
                {/* <div>
                    <Demo />
                </div> */}
                {/* <div>
                    <Demo1 />
                </div> */}
                <div>
                    <Form horizontal>
                        <FormItem
                        id="control-input"
                        label="输入框"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        >
                        {this.state.inputValue}
                        <Input id="control-input" value={this.state.inputValue} onChange={this.onInputChange} placeholder="Please enter..." />
                        </FormItem>

                        <FormItem
                        id="control-textarea"
                        label="文本域"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        >
                        <Input type="textarea" id="control-textarea" rows="3" />
                        </FormItem>

                        <FormItem
                        id="select"
                        label="Select 选择器"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        >
                        <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={this.handleSelectChange}>
                            <Option value="jack">jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="disabled" disabled>disabled</Option>
                            <Option value="yiminghe">yiminghe</Option>
                        </Select>
                        </FormItem>

                        <FormItem
                        label="Checkbox 多选框"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        >
                        <Checkbox className="ant-checkbox-vertical">选项一</Checkbox>
                        <Checkbox className="ant-checkbox-vertical">选项二</Checkbox>
                        <Checkbox className="ant-checkbox-vertical" disabled>选项三（不可选）</Checkbox>
                        </FormItem>

                        <FormItem
                        label="Checkbox 多选框"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        >
                        <Checkbox className="ant-checkbox-inline">选项一</Checkbox>
                        <Checkbox className="ant-checkbox-inline">选项二</Checkbox>
                        <Checkbox className="ant-checkbox-inline">选项三</Checkbox>
                        </FormItem>

                        <FormItem
                        label="Radio 单选框"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        >
                        <RadioGroup defaultValue="b">
                            <Radio value="a">A</Radio>
                            <Radio value="b">B</Radio>
                            <Radio value="c">C</Radio>
                            <Radio value="d">D</Radio>
                        </RadioGroup>
                        </FormItem>
                    </Form>
                </div>

                {/* <div>
                    <BasicDemo />
                </div> */}
            </div>
        )
    }
}


  
  

export default FormView