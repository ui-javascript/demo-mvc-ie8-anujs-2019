import React, {Component} from 'react'
import {Card, Tabs, Button, Form, Select, Input, Table} from 'antd'
import './index.scss'

const columns = [
  {title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
  {title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left'},
  {title: '列1', dataIndex: 'address', key: '1', width: 150},
  {title: '列2', dataIndex: 'address', key: '2', width: 150},
  {title: '列3', dataIndex: 'address', key: '3', width: 150},
  {title: '列4', dataIndex: 'address', key: '4', width: 150},
  {title: '列5', dataIndex: 'address', key: '5', width: 150},
  {title: '列6', dataIndex: 'address', key: '6', width: 150},
  {title: '列7', dataIndex: 'address', key: '7', width: 150},
  {title: '列8', dataIndex: 'address', key: '8', width: 150},
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">操作</a>,
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


class LoginUser extends Component {
  constructor() {
    super()

    this.state = {
      schoolList: ['1', '2', '3']
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(val) {
    const schoolList = this.state.schoolList
    // fetch schoolList
    this.setState({
      schoolList: this.state.schoolList.filter(_ => _.includes(val))
    })
  }

  handleForgetPassword() {
  }

  handleSubmit() {
  }

  render() {
    return (
      <div class="align-center p-5">
        <img src={require('@/assets/student-logo.png')}/>

        <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
      </div>
    )
  }
}

export default LoginUser
