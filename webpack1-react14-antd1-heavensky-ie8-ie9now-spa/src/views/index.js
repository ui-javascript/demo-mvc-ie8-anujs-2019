// // https://github.com/RubyLouvre/anu-ie8-example/blob/master/src/index.js
// import 'es5-shim'; //IE8 ^4.5.10
// import 'es5-shim/es5-sham'
// // import 'object-create-ie8';//这样就不用加上es5-sham
// // import 'object-defineproperty-ie8';
// import 'babel-polyfill'
// import 'console-polyfill';
// // import 'json3';  //比IE8的JSON好用
// // import 'bluebird'; //性能超高的Promise实现
// // import 'fetch-polyfill2'; //fetch 实现
// import 'media-match'


import React from "react";
import { render } from "react-dom";
import App from "./app";
import "./index.less";

render(<App />, document.getElementById("app"));
