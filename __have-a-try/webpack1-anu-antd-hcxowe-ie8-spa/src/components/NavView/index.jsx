import React, { Component } from 'react'
import './index.less'

import { Breadcrumb, Icon, Menu, Pagination, Select, Steps, Tabs, BackTop } from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

class NavView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 'mail',
            current1: '1',
            openKeys: [],
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleClick1 = this.handleClick1.bind(this)
        this.onToggle = this.onToggle.bind(this)
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    }

    handleClick1(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
    }

    render() {
        function callback(key) {
            console.log(key);
        }
        return (
            <div class="nav-wrapper">
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Icon type="user" />
                            <span>Application List</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Application
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <Menu onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="mail">
                        <Icon type="mail" />导航一
                        </Menu.Item>
                        <Menu.Item key="app" disabled>
                        <Icon type="appstore" />导航二
                        </Menu.Item>
                        <SubMenu title={<span><Icon type="setting" />导航 - 子菜单</span>}>
                        <MenuItemGroup title="分组1">
                            <Menu.Item key="setting:1">选项1</Menu.Item>
                            <Menu.Item key="setting:2">选项2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="分组2">
                            <Menu.Item key="setting:3">选项3</Menu.Item>
                            <Menu.Item key="setting:4">选项4</Menu.Item>
                        </MenuItemGroup>
                        </SubMenu>
                        <Menu.Item key="alipay">
                        <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
                        </Menu.Item>
                    </Menu>
                </div>
                <div>
                    <Menu onClick={this.handleClick1}
                        style={{ width: 240 }}
                        openKeys={this.state.openKeys}
                        onOpen={this.onToggle}
                        onClose={this.onToggle}
                        selectedKeys={[this.state.current1]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                        <Menu.Item key="1">选项1</Menu.Item>
                        <Menu.Item key="2">选项2</Menu.Item>
                        <Menu.Item key="3">选项3</Menu.Item>
                        <Menu.Item key="4">选项4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                        <Menu.Item key="5">选项5</Menu.Item>
                        <Menu.Item key="6">选项6</Menu.Item>
                        <SubMenu key="sub3" title="三级导航">
                            <Menu.Item key="7">选项7</Menu.Item>
                            <Menu.Item key="8">选项8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
                        <Menu.Item key="9">选项9</Menu.Item>
                        <Menu.Item key="10">选项10</Menu.Item>
                        <Menu.Item key="11">选项11</Menu.Item>
                        <Menu.Item key="12">选项12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div>
                    <Menu style={{ width: 240 }} mode="vertical">
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                        <MenuItemGroup title="分组1">
                            <Menu.Item key="1">选项1</Menu.Item>
                            <Menu.Item key="2">选项2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="分组2">
                            <Menu.Item key="3">选项3</Menu.Item>
                            <Menu.Item key="4">选项4</Menu.Item>
                        </MenuItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                        <Menu.Item key="5">选项5</Menu.Item>
                        <Menu.Item key="6">选项6</Menu.Item>
                        <SubMenu key="sub3" title="三级导航">
                            <Menu.Item key="7">选项7</Menu.Item>
                            <Menu.Item key="8">选项8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><icon type="setting" /><span>导航三</span></span>}>
                        <Menu.Item key="9">选项9</Menu.Item>
                        <Menu.Item key="10">选项10</Menu.Item>
                        <Menu.Item key="11">选项11</Menu.Item>
                        <Menu.Item key="12">选项12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div>
                    <Pagination defaultCurrent={1} total={50} />
                    <Pagination showQuickJumper defaultCurrent={2} total={500} />
                    <Pagination simple defaultCurrent={2} total={50} />
                    <Pagination
                        selectComponentClass={Select}
                        total={80}
                        showTotal={total => `共 ${total} 条`}
                        pageSize={20} defaultCurrent={1}
                    />
                </div>
                <div>
                    <Steps current={1}>
                        <Step title="已完成" description="这里是多信息的描述" />
                        <Step title="进行中" description="这里是多信息的描述" />
                        <Step title="待运行" description="这里是多信息的描述" />
                        <Step title="待运行" description="这里是多信息的描述" />
                    </Steps>
                </div>
                <div>
                    <Steps>
                        <Step status="finish" title="步骤1" icon="cloud" />
                        <Step status="process" title="步骤2" icon="apple" />
                        <Step status="wait" title="步骤3" icon="github" />
                    </Steps>
                </div>
                <div>
                    <Steps direction="vertical" current={1}>
                        <Step title="已完成" description="这里是多信息的描述" />
                        <Step title="进行中" description="这里是多信息的描述" />
                        <Step title="待运行" description="这里是多信息的描述" />
                        <Step title="待运行" description="这里是多信息的描述" />
                    </Steps>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab={<span><Icon type="apple" />选项卡一</span>} key="1">选项卡一内容</TabPane>
                        <TabPane tab={<span><Icon type="android" />选项卡二</span>} key="2" disabled>选项卡二内容</TabPane>
                        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
                    </Tabs>
                </div>
                <div>
                    <Tabs type="card">
                        <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
                        <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
                        <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
                    </Tabs>
                </div>
                <div>
                    <BackTop />
                    向下滚动后，见右下角灰色按钮
                </div>
            </div>
        )
    }
}

export default NavView