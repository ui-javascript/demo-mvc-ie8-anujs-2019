import React, { Component } from 'react'
import { Input } from 'antd'
import './index.less'

class HInput extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.props.onChange && this.props.onChange(e)
    } 

    render() {
        return (
            <span class="h-input-wrapper">
                <input class="h-input" style={this.props.style} defaultValue="" type="text" onChange={this.onChange} ref={(input) => this.input = input} />
            </span>
        )
    }
}

export default HInput