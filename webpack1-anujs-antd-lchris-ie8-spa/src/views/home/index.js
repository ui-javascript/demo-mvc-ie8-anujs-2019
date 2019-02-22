import React, {Component} from 'react'
import {Menu, Card, Table } from 'antd'
import EkIcon from '@/components/EkIcon'
import './index.scss'


const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列1', dataIndex: 'address', key: '1', width: 150 },
  { title: '列2', dataIndex: 'address', key: '2', width: 150 },
  { title: '列3', dataIndex: 'address', key: '3', width: 150 },
  { title: '列4', dataIndex: 'address', key: '4', width: 150 },
  { title: '列5', dataIndex: 'address', key: '5', width: 150 },
  { title: '列6', dataIndex: 'address', key: '6', width: 150 },
  { title: '列7', dataIndex: 'address', key: '7', width: 150 },
  { title: '列8', dataIndex: 'address', key: '8', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">操作</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}


// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === '胡彦祖',    // 配置无法勾选的列
  }),
};


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 1,
      user: {
        name: ''
      }
    }

    this.bind('handleClick')
    this.bind('asyncData')
  }


  bind (fn) {
    this[fn] = this[fn].bind(this)
  }
  handleClick () {
  }
  asyncData () {
    this.setState({
      user: { name: '翼小小' }
    })
  }

  componentDidMount () {
    this.asyncData()
  }

  render() {
    return (
      <section class="home view overhidden">
        <header class="home-head view-head shadow-border">
          <div class="home-head-icon f-16 text-blue">
            <img src={require('@/assets/user-logo.png')}/>翼赛英语竞赛平台
          </div>
          <Menu className="home-head-menu"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">
            <Menu.Item key="app">
              <EkIcon type="mobile" />手机端下载
            </Menu.Item>
            <Menu.SubMenu title={<span><EkIcon type="user" />{this.state.user.name}</span>}>
              <Menu.Item key="setting:1">个人信息</Menu.Item>
              <Menu.Item key="setting:2">账号设置</Menu.Item>
              <Menu.Item key="setting:3">购买记录</Menu.Item>
              <Menu.Item key="setting:4">退出登录</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </header>
        <main class="home-main view-main">
          {this.props.children}



          <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
        </main>
      </section>
    )
  }
}

export default Home
