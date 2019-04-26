import React, {Component} from "react";
import PasswordChangeForm from './PasswordChangeForm'
import "./PasswordChange.css"
import {queryParams} from '../../utils/regfns'

class PasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    passwordChangeSuccess() {
        this.props.history.push('/login');
    }

    render() {
        const searchString = this.props.location.search.slice(1);
        const query = queryParams(searchString);
        const backPath = query.backPath;
        return (
            <div className='password-change-main'>
                {/*<img src="./assets/static/login/logo.png" className="login-logo"/>*/}
                <div className="password-change-wrapper">
                    <PasswordChangeForm history={this.props.history} onSubmitSuccess={this.passwordChangeSuccess.bind(this)}
                                        backPath={backPath}/>
                </div>
                <ul className='login-footer'>
                    <li>Powered by ChenHua Technology</li>
                    <li>电话：021-00000000</li>
                    <li>@2018 xxx技术支持公司</li>
                </ul>
            </div>
        );
    }
}

export default PasswordChange;
