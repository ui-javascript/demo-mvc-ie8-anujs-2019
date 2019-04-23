import React, { Component } from 'react';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
// import { JrButton } from 'ui';

// import flexMenu from 'static/icons/flex-menu.png';
import Logo from 'static/imgs/logo-vn.png';

const children1 = [
  <MenuItem key="2" className="header-menu-item">
    信息修改
  </MenuItem>,
  <MenuItem key="3" className="header-menu-item">
    密码修改
  </MenuItem>,
  <MenuItem key="6" className="header-menu-item">
    退出
  </MenuItem>,
];

export default class Header extends Component {
  editPersonInfo = () => {};

  editPassword = () => {};

  logOut = () => {};

  render() {
    return (
      <div>
        <div className="header">
          <div>
            <span>
              <img className="header-logo" src={Logo} alt="" />
            </span>
            <span className="header-title">
              XXXXXXXX管理平台
              {/* <JrButton className="header-flex-menu">
                <img src={flexMenu} alt="" />
              </JrButton> */}
            </span>
          </div>
          <div className="header-right">
            <Menu
              className="header-menu"
              selectedKeys={['3']}
              mode="horizontal"
              openAnimation="slide-up"
            >
              {children1}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
