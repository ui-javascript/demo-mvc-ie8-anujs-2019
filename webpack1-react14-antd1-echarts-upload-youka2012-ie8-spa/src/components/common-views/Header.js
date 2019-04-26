import React, {Component} from "react";
import {Menu, Dropdown, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import Cookies from 'js-cookie';
import myAxios from '../../utils/myAxios'
import "./Header.less"

class HeaderMenuWrap extends Component {
    constructor(props) {
        super(props);
        const current = this.props.location.pathname === '/' ? '/home' : this.props.location.pathname;
        this.state = {
            current: current.split('/').slice(0, 2).join('/'),
            theme: 'dark',//dark
        };
    };

    handleClick = (e) =>
        this.setState({
            current: e.key,
        });

    render() {
        console.log('header menu render');
        let menuItems;
        const menuData = window.menuData;
        // const menuData = Cookies.get('__menuData');
        if (menuData) {
            menuItems = menuData.map(item => (
                <Menu.Item key={'/' + item.url} disabled={item.url ? false : true}>
                    <Link to={'/' + item.url}>{item.name}</Link>
                </Menu.Item>
            ))
        }
        return (
            <div className="header-menu-wrap font-14">
                <Menu className='header-menu' onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      mode="horizontal" theme={this.state.theme}
                >
                    {menuItems}
                </Menu>
            </div>
        );
    }
}

const HeaderMenu = withRouter(HeaderMenuWrap);

const handleLogoutClick = () => {
    //退出
    window.location.replace('#/login');
    /*myAxios.get('./api/v1/sys/logoff').then(() => {
    }).catch(() => {
        window.location.replace('#/login');
    })*/
};

const RightDropMenu = (props) => (
    <div className="right-dropmenu-wrap">
        <Menu className='header-right-drop'>
            <Menu.Item>
                <a href='javascript:void(0);' onClick={() => {
                    const path = window.location.hash ? window.location.hash.slice(1) : '/home';
                    props.history.push('/password-change?backPath='+path);
                }} className="font-14 header-right-drop-text"><Icon
                    type="info-circle"/>修改密码</a>
            </Menu.Item>
            <Menu.Item>
                <a href="javascript:void(0);" onClick={handleLogoutClick} className="font-14 header-right-drop-text"><Icon
                    type="rollback"/>注&nbsp;&nbsp;&nbsp;&nbsp;销</a>
            </Menu.Item>
        </Menu></div>
);
const RightDrop = props =>
    <div className="right-drop-wrap">
        <Icon type="user" className="font-14"/>&nbsp;&nbsp;
        <Dropdown overlay={<RightDropMenu history={props.history}/>} history={props.history}>
            <a className="ant-dropdown-link" href="javascript:void(0);">
                {props.userName} <Icon type="down" className="font-14"/>
            </a>
        </Dropdown>
    </div>;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        console.log('header render');
        // const userName = window.__userCode ? window.__userCode : '';
        const userCode = Cookies.get('__userCode');
        const userName = userCode ? userCode : '';
        return (
            <div className="header-wrap">
                <div className="header-wrap__container">
                    <span className="header-title"></span>
                    <div className="tab-wrap"><RightDrop userName={userName} history={this.props.history}/>
                        <HeaderMenu/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
