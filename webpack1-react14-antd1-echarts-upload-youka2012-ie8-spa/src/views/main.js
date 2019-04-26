import React, {Component} from "react";
import {Router} from "react-router-dom";
import {BackTop, Spin, notification} from 'antd';
import myAxios from '../utils/myAxios';
import Cookies from 'js-cookie';

import Header from "../components/common-views/Header";
import {RouteList} from "../components/common-tools/Route";
import Footer from "../components/common-views/Footer";
import routes from "./routes";
import "./main.css";
import {arrayToTree} from "../utils/data-tools";

import ApiTest from '../dev-tools/ApiTest'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentWillMount() {
        const isAuth = Cookies.get('_isAuthorised');
        if (!isAuth) {
            window.location.replace("#/login");
        }
    }

    componentDidMount() {
        //在此请求菜单数据
        /*myAxios.get('./api/v1/sys/user-menu').then((data) => {
            window.menuData = arrayToTree(data, 'id', 'parent_id', 'children');
            this.setState({
                loading: false
            });
            this._raceFlag++;
            if (this._raceFlag === 2) {
                this.setState({loading: false})
            }
        }).catch(err => {

        });*/

        //模拟菜单数据
        const userMenu = [{
            "id": 10,
            "name": "首页",
            "type": "INNER",
            "url": "home"
        }, {
            "id": 10000,
            "name": "Ant Design集成",
            "type": "INNER",
            "url": "antd-demos"
        }, {
            "id": 11000,
            "parent_id": 10000,
            "name": "组件",
            "type": "INNER",
        }, {
            "id": 11001,
            "name": "Select",
            "parent_id": 11000,
            "type": "INNER",
            "url": 'antd-demos/com-select'
        },
            {
                "id": 20000,
                "name": "echarts集成",
                "type": "INNER",
                "url": "echarts-demos"
            },
            {
                "id": 30000,
                "name": "webuploader集成",
                "type": "INNER",
                "url": "webuploader-demos"
            },
            {
                "id": 40000,
                "name": "websocket",
                "type": "INNER",
                "url": "sockjs-demos"
            },
            {
                "id": 80000,
                "name": "常用组件",
                "type": "INNER",
                "url": "platform-demos"
            },
            {
                "id": 90000,
                "name": "文档",
                "type": "INNER",
                "url": "docs"
            }, {
                "id": 91000,
                "parent_id": 90000,
                "name": "React",
                "type": "INNER",
            }, {
                "id": 91001,
                "parent_id": 91000,
                "name": "入门介绍",
                "type": "INNER",
                "url": 'docs/react-introduce'
            }];
        window.menuData = arrayToTree(userMenu, 'id', 'parent_id', 'children');
        this.setState({loading: false});
    }

    render() {
        return (
            <div className='main-body'>
                <Header history={this.props.history}/>
                <div id="main">
                    <Spin spinning={this.state.loading} size='large'>
                        {this.state.loading ? null : <RouteList routes={routes}/>}
                    </Spin>
                </div>
                <BackTop/>
                <ApiTest/>
                <Footer/>
            </div>
        )
    }
}

export default Main;