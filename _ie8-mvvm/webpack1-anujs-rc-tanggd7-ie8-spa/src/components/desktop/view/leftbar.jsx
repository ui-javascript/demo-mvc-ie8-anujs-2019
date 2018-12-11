import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

export default class Leftbar extends Component {
  test = () => {};

  render() {
    return (
      <div className="leftbar">
        <Menu className="leftbar-menu" mode="inline">
          <SubMenu key="1" title="平台管理">
            <MenuItem key="1-1">菜单管理</MenuItem>
            <MenuItem key="1-2">角色管理</MenuItem>
            <MenuItem key="1-3">用户管理</MenuItem>
          </SubMenu>
          <SubMenu key="2" title="平台运营">
            <MenuItem key="2-1">班次管理</MenuItem>
            <MenuItem key="2-2">学员管理</MenuItem>
            <SubMenu key="2-3" title="测试">
              <MenuItem key="2-3-1">测试1</MenuItem>
              <MenuItem key="2-3-2">测试2</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem key="3">批量任务管理</MenuItem>
        </Menu>
      </div>
    );
  }
}
