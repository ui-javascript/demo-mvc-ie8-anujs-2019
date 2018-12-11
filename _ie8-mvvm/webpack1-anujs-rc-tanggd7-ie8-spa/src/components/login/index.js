import React, { Component } from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import { JrInput, JrButton, JrCheckbox } from 'ui';
import { response } from 'tool';
import './index.less';

import logo from 'static/imgs/logo-big.png';
import iconUser from 'static/icons/login-user.png';
import iconPwd from 'static/icons/login-pwd.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.rememberPassword = false;
  }

  submit = () => {
    const { form } = this.props;
    form.validateFields(error => {
      if (!error) {
        // const { userCode, password } = value;

        response.push('desktop');
      }
    });
  };

  remember = e => {
    this.rememberPassword = e.target.checked;
  };

  getError = name => {
    const { form } = this.props;
    const errors = form.getFieldError(name);
    return errors ? errors.join(',') : null;
  };

  render() {
    const { form } = this.props;
    const { getFieldProps } = form;
    return (
      <div className="login">
        <div className="login-top" />
        <div className="login-header">
          <img className="login-logo" src={logo} alt="" />
          <span className="login-title">工业底片数字化智能云平台</span>
        </div>
        <div className="login-form">
          <div className="login-form-div">
            <img className="login-icon" src={iconUser} alt="" />
            <JrInput
              className="login-input"
              {...getFieldProps('userCode', {
                rules: [{ required: true, message: `用户名必填` }],
              })}
              placeholder="用户名"
            />
            <b>{this.getError('userCode')}</b>
          </div>
          <div className="login-form-div">
            <img className="login-icon" src={iconPwd} alt="" />
            <JrInput
              className="login-input"
              {...getFieldProps('password', {
                rules: [{ required: true, message: `密码必填` }],
              })}
              placeholder="密码"
              type="password"
            />
            <b>{this.getError('password')}</b>
          </div>
          <div className="login-wapper">
            <JrCheckbox onChange={this.remember}>记住密码</JrCheckbox>
            &nbsp;&nbsp;
            <Link to="/forget" className="login-forget">
              忘记密码
            </Link>
          </div>
          <JrButton onClick={this.submit} className="login-btn" type="primary">
            登录
          </JrButton>
        </div>
      </div>
    );
  }
}

export default createForm()(Login);
