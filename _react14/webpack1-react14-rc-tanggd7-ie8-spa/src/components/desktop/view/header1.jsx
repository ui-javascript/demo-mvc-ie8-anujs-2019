import React, { Component } from 'react';

export default class Header extends Component {
  editPersonInfo = () => {};

  editPassword = () => {};

  logOut = () => {};

  render() {
    return (
      <div>
        <div className="header">
          <div className="header_logo">
            <span>
              <img src={require('/static/images/logo.jpg')} alt="" />
            </span>
            <span className="title">工业底片数字化智能云平台</span>
          </div>
          <div className="right_link">
            <span>
              <button type="button" onClick={this.editPersonInfo}>
                信息修改
              </button>
            </span>
            <span> - </span>
            <span>
              <button type="button" onClick={this.editPassword}>
                密码修改
              </button>
            </span>
            <span> - </span>
            <span>
              <button type="button" onClick={this.logOut}>
                退出
              </button>
            </span>
          </div>
        </div>
        <div className="toggle" />
      </div>
    );
  }
}
