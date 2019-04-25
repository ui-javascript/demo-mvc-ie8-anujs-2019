import React, {Component} from "react";
import {Card, Col, Row, Form, Input, Button,Modal,Message} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
import "./PasswordChangeForm.css"
import myAxios from "../../utils/myAxios";

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //刷新验证码
        // this.handleImgClick();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            //todo submit action
            console.log(values);
            //修改成功的回调
            this.props.onSubmitSuccess();
            //请求
            /*
            values['__isFormType'] = true;
            myAxios.post('./api/v1/pass-change', values)
                .then((res) => {
                    Message.success(res);
                    this.props.onSubmitSuccess();
                })
                .catch(error => {
                    Modal.warning({
                        title: error
                    });
                    this.handleImgClick();
                })*/
        })
    }

    handleImgClick(e) {
        //请求验证码
        /*const img = this.refs.verifyImg;
        img.src = './api/v1/kaptcha?' + Math.random() * 100;*/
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleBack(e) {
        e.preventDefault();
        const backPath = this.props.backPath;
        if(backPath === undefined || backPath === ''){
            this.props.history.push('login');
        }else{
            this.props.history.push(this.props.backPath);
        }
    }

    checkNewPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword1')) {
            callback('两次输入应该一致');
        } else {
            callback();
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
        const userNameProps = getFieldProps('loginName', {
            rules: [
                {required: true, min: 5, message: '用户名至少5个字符'},
                // {validator: this.checkUserName.bind(this)}
            ]
        });
        const passwordProps = getFieldProps('oldPassword', {
            rules: [
                {required: true, min: 5, message: '密码至少5个字符'},
                // {validator: this.checkPassword.bind(this)}
            ]
        });
        const newPasswordProps = getFieldProps('newPassword1', {
            rules: [
                {required: true, min: 5, message: '密码至少5个字符'},
                // {validator: this.checkPassword.bind(this)}
            ]
        });
        const newPasswordProps2 = getFieldProps('newPassword2', {
            rules: [
                {required: true, min: 5, message: '请再次输入密码'},
                {validator: this.checkNewPassword.bind(this)}
            ]
        });
        const validateCodeProps = getFieldProps('verifyCode', {
            rules: [
                {required: true, message: '必须输入验证码'},
                // {validator: this.checkValidateCode.bind(this)}
            ]
        });
        const formCommonStyle = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        return (
            <div className='password-change-box'>
                <Card title='密码修改'>
                    <div className='password-change-card-content'>
                        <Form horizontal form={this.props.form}>
                            <FormItem
                                label='账号'
                                {...formCommonStyle}
                                hasFeedback
                            >
                                <Input {...userNameProps} placholder='请输入用户名' className='password-change-input' autoFocus/>
                            </FormItem>
                            <FormItem
                                label='密码'
                                {...formCommonStyle}
                                hasFeedback
                            >
                                <Input {...passwordProps} type='password' className='password-change-input'/>
                            </FormItem>
                            <FormItem
                                label='新密码'
                                {...formCommonStyle}
                                hasFeedback
                            >
                                <Input {...newPasswordProps} type='password' className='password-change-input'/>
                            </FormItem>
                            <FormItem
                                label='再次输入'
                                {...formCommonStyle}
                                hasFeedback
                            >
                                <Input {...newPasswordProps2} type='password' className='password-change-input'/>
                            </FormItem>
                            <FormItem
                                label='验证码'
                                labelCol={{span: 5}}
                            >
                                <Col span='12'>
                                    <FormItem>
                                        <Input {...validateCodeProps} className='password-change-input'></Input>
                                    </FormItem>
                                </Col>
                                <Col span='6'>
                                    <img className='verify-img' src='./assets/static-img/login/kaptcha.jpg' onClick={this.handleImgClick.bind(this)} ref='verifyImg'/>
                                </Col>
                            </FormItem>
                            <FormItem
                                wrapperCol={{span: 16, offset: 5}}
                                help
                            >
                                <div className='password-change-button'>
                                    <Button type='primary'
                                            onClick={this.handleSubmit.bind(this)}>确&nbsp;&nbsp;定</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button type='text'
                                            onClick={this.handleReset.bind(this)}>重&nbsp;&nbsp;置</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button type='dashed'
                                            onClick={this.handleBack.bind(this)}>返&nbsp;&nbsp;回</Button>
                                </div>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }
}

export default createForm()(PasswordChangeForm);