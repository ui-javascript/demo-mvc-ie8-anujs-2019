import React, {Component} from "react";
import {Carousel} from 'antd'
import LoginForm from './LoginForm'
import Cookies from 'js-cookie';

import "./Login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        Cookies.remove("CSRFDefense");
        Cookies.remove("_isAuthorised");
        Cookies.remove("menu_key_path");
        Cookies.remove("__userCode");
        Cookies.remove("__userRoles");
        Cookies.remove("__userPermissions");
    }

    loginSuccess() {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div className='login-main'>
                {/*<img src="./assets/static/login/logo.png" className="login-logo"/>*/}
                <img src="./assets/static-img/login/halo.png" className="login-halo"/>
                <div className="login-wrapper">
                    <div className='login-carousel-wrapper'>
                        <Carousel autoplay speed={2000}>
                            <div className='login-carousel-card'><img src="./assets/static-img/login/slide1.png" alt="" className='login-carousel-img'/></div>
                            <div className='login-carousel-card'><img src="./assets/static-img/login/slide2.png" alt="" className='login-carousel-img'/></div>
                        </Carousel>
                    </div>
                    <div className="login-form-wrapper">
                        <LoginForm history={this.props.history} onSubmitSuccess={this.loginSuccess.bind(this)}/>
                    </div>
                </div>
                <ul className='login-footer'>
                    <li>Powered by ChenHua Technology</li>
                    <li>电话：021-00000000</li>
                    <li>@2018 上海辰华网络技术服务有限公司</li>
                </ul>
            </div>
        );
    }
}

export default Login;