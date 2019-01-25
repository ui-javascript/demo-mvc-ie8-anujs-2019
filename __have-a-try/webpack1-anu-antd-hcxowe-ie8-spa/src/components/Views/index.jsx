import React, { Component } from 'react'
import { Alert, Badge, Calendar, Card, Carousel, Collapse, Menu, 
    Dropdown, Icon, Button, message, Modal, notification, Popconfirm, Progress,
    Tag, Timeline, Tooltip } from 'antd'
import './index.less'

const Panel = Collapse.Panel;
const confirm = Modal.confirm;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" href="http://www.alipay.com/">第一个菜单项</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" href="http://www.taobao.com/">第二个菜单项</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" href="http://www.tmall.com/">第三个菜单项</a>
        </Menu.Item>
    </Menu>
);

class Views extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    showModal() {
        this.setState({
          visible: true,
        });
    }

    handleOk() {
        console.log('点击了确定');
        this.setState({
          visible: false,
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    dateCellRender(value) {
        return <div>自定义日数据 {value.getDayOfMonth()}</div>;
    }
      
    monthCellRender(value) {
        return <div>自定义月数据 {value.getMonth()}</div>;
    }
    handleMenuClick(e) {
        console.log('click', e);
    }
    handleButtonClick(e) {
        console.log('click left button', e);
    }

    render() {

        const menu1 = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1">第一个菜单项</Menu.Item>
              <Menu.Item key="2">第二个菜单项</Menu.Item>
              <Menu.Item key="3">第三个菜单项</Menu.Item>
            </Menu>
        );

        const success = function () {
            message.success('这是一条成功提示');
          };
          
          const error = function () {
            message.error('这是一条报错提示');
          };
          
          const warning = function () {
            message.warning('这是一条警告提示');
          };
          function showConfirm() {
            confirm({
              title: '您是否确认要删除这项内容',
              content: '一些解释',
              onOk() {
                console.log('确定');
              },
              onCancel() {},
            });
          }

          const openNotification = function () {
            notification.open({
              message: '这是标题',
              description: '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案',
            });
          };
          const openNotificationWithIcon = function (type) {
            return function () {
              notification[type]({
                message: '这是标题',
                description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案',
              });
            };
          };

          function confirm() {
            message.success('点击了确定');
          }
          
          function cancel() {
            message.error('点击了取消');
          }

          const text = '确定要删除这个任务吗？';


        return (
            <div class="views-wrap">
                <div>
                    <Collapse accordion>
                        <Panel header={'This is panel header 1'} key="1">
                            <p>{text}</p>
                        </Panel>
                        <Panel header={'This is panel header 2'} key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header={'This is panel header 3'} key="3">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>
                
                <div>
                    <Alert message="成功提示的文案" type="success" />
                    <Alert message="消息提示的文案" type="info" />
                    <Alert message="警告提示的文案" type="warning" />
                    <Alert message="错误提示的文案" type="error" />
                    <Alert message="成功提示的文案" type="success" showIcon />
                    <Alert message="消息提示的文案" type="info" showIcon />
                    <Alert message="警告提示的文案" type="warning" showIcon />
                    <Alert message="错误提示的文案" type="error" showIcon />
                    <Alert message="成功提示的文案"
                        description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
                        type="success"
                        showIcon
                    />
                    <Alert message="消息提示的文案"
                        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
                        type="info"
                        showIcon
                    />
                    <Alert
                        message="警告提示的文案"
                        description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
                        type="warning"
                        showIcon
                    />
                    <Alert
                        message="错误提示的文案"
                        description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
                        type="error"
                        showIcon
                    />
                </div>

                <div>
                    <Badge count={5}>
                        <a href="#" className="head-example"></a>
                    </Badge> 
                </div>

                <div>
                    <Calendar defaultValue={new Date('2018-07-01')} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
                </div>

                <div>
                    <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>

                <div>
                    <Carousel autoplay>
                        <div class="carousel-bg"><h3>1</h3></div>
                        <div class="carousel-bg"><h3>2</h3></div>
                        <div class="carousel-bg"><h3>3</h3></div>
                        <div class="carousel-bg"><h3>4</h3></div>
                    </Carousel>
                </div>

                <div>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        触发链接 <Icon type="down" />
                        </a>
                    </Dropdown>

                    <Dropdown.Button onClick={this.handleButtonClick} overlay={menu1} type="ghost">
                        某功能按钮
                        </Dropdown.Button>
                        <Dropdown overlay={menu1}>
                        <Button type="ghost" style={{ marginLeft: 8 }}>
                            按钮 <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>
                <div>
                    <Button onClick={success}>显示成功提示</Button>
                    <Button onClick={error}>显示报错提示</Button>
                    <Button onClick={warning}>显示警告提示</Button>
                </div>
                <div>
                    <Button type="primary" onClick={this.showModal}>显示对话框</Button>
                    <Modal title="第一个 Modal" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    >
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                    </Modal>
                    <Button onClick={showConfirm}>确认对话框</Button>
                </div>
                <div>
                    <Button type="primary" onClick={openNotification}>打开通知提醒框</Button>
                    <Button onClick={openNotificationWithIcon('success')}>成功</Button>
                    <Button onClick={openNotificationWithIcon('info')}>消息</Button>
                    <Button onClick={openNotificationWithIcon('warning')}>警告</Button>
                    <Button onClick={openNotificationWithIcon('error')}>错误</Button>
                </div>
                <div>
                    <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>
                <div>
                    <div style={{ marginLeft: 60 }}>
                        <Popconfirm placement="topLeft" title={text} onConfirm={confirm}>
                        <Button>上左</Button>
                        </Popconfirm>
                        <Popconfirm placement="top" title={text} onConfirm={confirm}>
                        <Button>上边</Button>
                        </Popconfirm>
                        <Popconfirm placement="topRight" title={text} onConfirm={confirm}>
                        <Button>上右</Button>
                        </Popconfirm>
                    </div>
                    <div style={{ width: 60, float: 'left' }}>
                        <Popconfirm placement="leftTop" title={text} onConfirm={confirm}>
                        <Button>左上</Button>
                        </Popconfirm>
                        <Popconfirm placement="left" title={text} onConfirm={confirm}>
                        <Button>左边</Button>
                        </Popconfirm>
                        <Popconfirm placement="leftBottom" title={text} onConfirm={confirm}>
                        <Button>左下</Button>
                        </Popconfirm>
                    </div>
                    <div style={{ width: 60, marginLeft: 252 }}>
                        <Popconfirm placement="rightTop" title={text} onConfirm={confirm}>
                        <Button>右上</Button>
                        </Popconfirm>
                        <Popconfirm placement="right" title={text} onConfirm={confirm}>
                        <Button>右边</Button>
                        </Popconfirm>
                        <Popconfirm placement="rightBottom" title={text} onConfirm={confirm}>
                        <Button>右下</Button>
                        </Popconfirm>
                    </div>
                    <div style={{ marginLeft: 60, clear: 'both' }}>
                        <Popconfirm placement="bottomLeft" title={text} onConfirm={confirm}>
                        <Button>下左</Button>
                        </Popconfirm>
                        <Popconfirm placement="bottom" title={text} onConfirm={confirm}>
                        <Button>下边</Button>
                        </Popconfirm>
                        <Popconfirm placement="bottomRight" title={text} onConfirm={confirm}>
                        <Button>下右</Button>
                        </Popconfirm>
                    </div>
                </div>
                <div>
                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress percent={50} showInfo={false} />
                    <Progress type="circle" percent={75} />
                    <Progress type="circle" percent={70} status="exception" />
                    <Progress type="circle" percent={100} />
                </div>

                <div>
                    <Tag closable color="blue">蓝色</Tag>
                    <Tag closable color="green">绿色</Tag>
                    <Tag closable color="yellow"><a href="https://github.com/ant-design/ant-design/issues/1862">黄色</a></Tag>
                    <Tag closable color="red">红色</Tag>
                </div>
                <div>
                    <Timeline>
                        <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
                        <Timeline.Item color="red">初步排除网络异常 2015-09-01</Timeline.Item>
                        <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">网络异常正在修复 2015-09-01</Timeline.Item>
                    </Timeline>
                </div>
                <div>
                    <Tooltip title="提示文字">
                        <span>鼠标移上来就会出现提示</span>
                    </Tooltip>
                    <Tooltip placement="topLeft" title="提示文字 提示文字">
                        <Button>默认对齐元素边缘</Button>
                    </Tooltip>
                    <Tooltip placement="topLeft" title="提示文字 提示文字" arrowPointAtCenter>
                        <Button>箭头指向目标元素的中心</Button>
                    </Tooltip>
                </div>

            </div>
        )
    }
}

export default Views