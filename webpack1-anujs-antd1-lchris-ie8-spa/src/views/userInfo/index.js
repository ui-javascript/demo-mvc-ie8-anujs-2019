import React, {Component} from 'react'
import { Card, Tabs, Button, Form, Select, Input, Table } from 'antd'

class UserInfo extends Component {
    constructor () {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit () {}

    render () {
        return (
            <div class="align-center p-5">
                用户信息
            </div>
        )
    }
}

export default UserInfo
