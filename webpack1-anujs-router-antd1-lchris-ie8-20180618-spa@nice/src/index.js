// 1. 腻子脚本
require('es5-shim')
require('es5-shim/es5-sham')
require('babel-polyfill')
require('console-polyfill')

// 2. 样式
require('./styles/index.scss')

// 3. React
const React = require('react')
const ReactDOM = require('react-dom')
React.createClass = require('create-react-class')
const {Router, hashHistory} = require('react-router')
const routes = require('./router')

// 4. 挂载节点
window.onload = function () {
  window.s = ReactDOM.render(
    <Router
      history={hashHistory}
      routes={routes}/>,
    document.getElementById('app')
  )
}
