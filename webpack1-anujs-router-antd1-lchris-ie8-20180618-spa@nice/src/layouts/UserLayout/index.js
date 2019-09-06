import React, {Component} from 'react'
import {Menu, Card, Table} from 'antd'
import EkIcon from '@/components/EkIcon'
import './index.scss'

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


  bind(fn) {
    this[fn] = this[fn].bind(this)
  }

  handleClick() {
  }

  asyncData() {
    this.setState({
      user: {name: '用户A'}
    })
  }

  componentDidMount() {
    this.asyncData()
  }

  render() {
    return (
      <section class="home view overhidden">
        <header class="home-head view-head shadow-border">
          <div class="home-head-icon f-16 text-blue">
            <img src={require('@/assets/user-logo.png')}/>XX考试系统
          </div>

          <Menu className="home-head-menu"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">

            {/*<Menu.Item key="app">*/}
            {/*<EkIcon type="mobile" />手机端下载*/}
            {/*</Menu.Item>*/}

            <Menu.SubMenu title={<span><EkIcon type="user"/>{this.state.user.name}</span>}>
              <Menu.Item>
                <a href="/#/userInfo">个人信息</a>
              </Menu.Item>
              {/*<Menu.Item key="/table">账号设置</Menu.Item>*/}
              {/*<Menu.Item key="setting:3">购买记录</Menu.Item>*/}
              <Menu.Item>
                <a href="/#/login">退出登录</a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </header>

        <main class="home-main view-main">
          {this.props.children}
        </main>

      </section>
    )
  }
}

export default Home
