import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App.js';

// 兼容IE8
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'fetch-ie8';
import 'babel-polyfill';

ReactDom.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.getElementById('app')
);

