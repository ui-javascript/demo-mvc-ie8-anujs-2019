import React, { Component } from 'react';
import {Navigation} from 'pages/Navigation/index';
// 全局样式
import './static/css/index.css';
// antd样式
// import 'antd/dist/antd.css';

class App extends Component {
    render() {
        return (
            <div>
                <Navigation />
            </div>
        );
    }
}
export {App};
