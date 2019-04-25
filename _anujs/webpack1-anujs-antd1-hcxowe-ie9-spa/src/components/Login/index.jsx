import React from 'react'

import { Button, Input } from 'antd'
import { hashHistory } from 'react-router'

import './index.less'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.onLoginClick = this.onLoginClick.bind(this)
    }

    onLoginClick() {
        hashHistory.push('/home')
    }

    render() {
        return (
            <div className="login-wrap"> 
                <div className="login-dialog">
                    <div className="login-item">
                        用户登录
                    </div>
                    <div className="login-item">
                        <Input/>
                    </div>
                    <div className="login-item">
                        <Input/>
                    </div>
                    <div className="login-item">
                        <Button type="primary" style={{ width: '100%'}} onClick={this.onLoginClick}>登  录</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login