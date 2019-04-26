import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import Cookies from 'js-cookie';
import './LeftMenu.css'

const SubMenu = Menu.SubMenu;

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        let keyPathFromCookie;
        const keyPathString = Cookies.get('menu_key_path');
        if (keyPathString) {
            keyPathFromCookie = JSON.parse(keyPathString);
        }
        let currentUrl = props.location.pathname;
        const currentKeys = currentUrl.split('/').slice(1);
        this.state = {
            current: currentKeys.slice(0,2).join('/'),
            openKeys: keyPathFromCookie?keyPathFromCookie:currentKeys,
        };
        console.log('left menu is init', this.state);

    }

    handleClick(e) {
        Cookies.set('menu_key_path', JSON.stringify(e.keyPath));
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        }, () => {
            window.location.replace('#' + this.state.current);
        });
    }

    onToggle(info) {
        console.log('onToggle', info);
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        })
    }

    render() {
        let leftMenuData;
        const menuData = window.menuData;
        // const menuData = Cookies.get('__menuData');
        if (menuData) {
            menuData.forEach(item =>{
                if(item.url === this.state.current.split('/')[0] && item.children){
                    leftMenuData = item.children;
                }
            })
        }

        const loopMenuItem = data => data.map(item => {
            if (item.children && item.children.length) {
                return <SubMenu key={item.id} title={<span><i
                    className={item.icon?item.icon:'fa fa-bars'}/><span>&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</span></span>}>{loopMenuItem(item.children)}</SubMenu>
            }
            return <Menu.Item key={item.url} disabled={item.type === 'OUTER'}><span><i
                className={item.icon?item.icon:'fa fa-link'}/>&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</span></Menu.Item>
        });
        return (
            <Menu onClick={this.handleClick.bind(this)}
                  theme='light'
                  style={{width: 240}}
                  openKeys={this.state.openKeys}
                  onOpen={this.onToggle.bind(this)}
                  onClose={this.onToggle.bind(this)}
                  selectedKeys={[this.state.current]}
                  mode='inline'
            >
                {
                    leftMenuData && loopMenuItem(leftMenuData)
                }
            </Menu>
        );
    }
}

export default LeftMenu;