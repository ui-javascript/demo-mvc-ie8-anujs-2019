/**
 * @author 汤国栋 2018-08-20 17:32:30
 * @deprecated 404 页面
 */
import React, { Component } from 'react';
import { response } from 'tool';
import { JrButton } from 'ui';
import './index.less';

export default class NotFound extends Component {
  onClickBack = () => {
    response.push('desktop');
  };

  render() {
    return (
      <div className="jerry-notfound">
        <h1>404</h1>
        <div className="jerry-notfound-explain">抱歉，你访问的页面不存在！</div>
        <JrButton type="primary" onClick={this.onClickBack}>
          返 回
        </JrButton>
      </div>
    );
  }
}
