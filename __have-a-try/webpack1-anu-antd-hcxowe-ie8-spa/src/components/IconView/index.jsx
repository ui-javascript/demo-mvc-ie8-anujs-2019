import React, { Component } from 'react'

import { Icon } from 'antd'
import './index.less'

class IconView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="icon-wrap">
                <Icon type="link" />
                <Icon type="step-backward" />
                <Icon type="step-forward" />
                <Icon type="fast-backward" />
                <Icon type="fast-forward" />
                <Icon type="shrink" />
                <Icon type="arrow-salt" />
                <Icon type="down" />
                <Icon type="up" />
                <Icon type="left" />
                <Icon type="right" />
                <Icon type="caret-down" />
                <Icon type="caret-up" />
                <Icon type="caret-left" />
                <Icon type="caret-right" />
                <Icon type="caret-circle-right" />
                <Icon type="caret-circle-left" />
                <Icon type="caret-circle-o-right" />
                <Icon type="caret-circle-o-left" />
                <Icon type="circle-right" />
                <Icon type="circle-left" />
                <Icon type="question-circle" />
                <Icon type="exclamation-circle" />
                <Icon type="plus-square" />
                <Icon type="android" />
                {/* <Icon type="loading" /> */}
                <Icon type="pay-circle" />
            </div>
        )
    }
}

export default IconView