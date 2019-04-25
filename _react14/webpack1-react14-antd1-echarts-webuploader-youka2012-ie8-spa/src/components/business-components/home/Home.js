import React, {Component} from "react";
// import {Button, Icon, InputNumber, Spin, Table, Cascader, Collapse, DatePicker, Timeline} from "antd";
// import Select from "./Select";
// import {$get} from "../../../utils/auth";
// import {shimAntdTable} from "../../../utils/antd";
import {Card, Modal, Button} from 'antd';
import "./Home.css"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log("home is mounting!")
    }

    componentDidMount() {
        console.log("home is mounted!")
    }

    render() {
        return (
            <div className="home-wrap">
                <div>
                    <div>
                        <div className="introduce-wrap">
                            <Card title="前端开发平台" bordered={false} style={{width: "100%"}}>
                                <h4>Hello</h4>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;