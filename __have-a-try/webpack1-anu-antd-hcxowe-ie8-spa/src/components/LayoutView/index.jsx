import React, { Component } from 'react'

import { Row, Col } from 'antd'
import './index.less'

class LayoutView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="layout-wrap">
                <div>
                    <Row>
                        <Col span={12}>.ant-col-12</Col>
                        <Col span={12}>.ant-col-12</Col>
                    </Row>
                    <Row>
                        <Col span={8}>.ant-col-8</Col>
                        <Col span={8}>.ant-col-8</Col>
                        <Col span={8}>.ant-col-8</Col>
                    </Row>
                    <Row>
                        <Col span={6}>.ant-col-6</Col>
                        <Col span={6}>.ant-col-6</Col>
                        <Col span={6}>.ant-col-6</Col>
                        <Col span={6}>.ant-col-6</Col>
                    </Row>
                </div>
                <div className="gutter-example">
                    <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">.ant-col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">.ant-col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">.ant-col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">.ant-col-6</div>
                    </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={8}>.ant-col-8</Col>
                        <Col span={8} offset={8}>.ant-col-8</Col>
                    </Row>
                    <Row>
                        <Col span={6} offset={6}>.ant-col-6 .ant-col-offset-6</Col>
                        <Col span={6} offset={6}>.ant-col-6 .ant-col-offset-6</Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>.ant-col-12 .ant-col-offset-6</Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default LayoutView