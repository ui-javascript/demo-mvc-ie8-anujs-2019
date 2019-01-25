/**
|--------------------------------------------------
| 启动入口文件
|--------------------------------------------------
*/

// 热加载
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import './style/style.less';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
