import React, { Component, PropTypes } from 'react'
//require('../../../public/plugins/bootstrap/dist/js/bootstrap.min.js')

import HeaderBar from './HeaderBar'
import Logo from './Logo'
import Navbar from './Navbar'

import HeaderMessage from './HeaderMessage/HeaderMessage'
import HeaderNotification from './HeaderNotification/HeaderNotification'
import HeaderTasks from './HeaderTasks/HeaderTasks'
import HeaderUser from './HeaderUser/HeaderUser'

// HeaderMessage测试数据
var messages = [{
    href: '#',
    title: 'Support Team',
    userPicture: 'dist/img/user2-160x160.jpg',
    content: 'Why not buy a new awesome theme?',
    time: '5 mins',
}, {
    href: '#',
    title: 'AdminLTE Design Team',
    userPicture: 'dist/img/user3-128x128.jpg',
    content: 'Why not buy a new awesome theme?',
    time: '2 hours',
}, {
    href: '#',
    title: 'Developers',
    userPicture: 'dist/img/user4-128x128.jpg',
    content: 'Why not buy a new awesome theme?',
    time: 'Today',
}, {
    href: '#',
    title: 'Sales Department',
    userPicture: 'dist/img/user3-128x128.jpg',
    content: 'Why not buy a new awesome theme?',
    time: 'Yesterday',
}, {
    href: '#',
    title: 'Reviewers',
    userPicture: 'dist/img/user4-128x128.jpg',
    content: 'Why not buy a new awesome theme?',
    time: '2 days',
}]

// HeaderNotification测试数据
var notifications = [{
    href: '#',
    content: '5 new members joined today',
    theme: 'fa fa-users text-aqua'
}, {
    href: '#',
    content: 'Very long description here that may not fit into the page and may cause design problems',
    theme: 'fa fa-warning text-yellow'
}, {
    href: '#',
    content: '5 new members joined',
    theme: 'fa fa-users text-red'
}, {
    href: '#',
    content: '25 sales made',
    theme: 'fa fa-shopping-cart text-green'
}, {
    href: '#',
    content: 'You changed your username',
    theme: 'fa fa-user text-red'
}]

// HeaderTasks测试数据
var tasks = [{
    href: '#',
    subject: 'Design some buttons',
    percentage: 20
}, {
    href: '#',
    subject: 'Create a nice theme',
    percentage: 40
}, {
    href: '#',
    subject: 'Some task I need to do',
    percentage: 60
}, {
    href: '#',
    subject: 'Make beautiful transitions',
    percentage: 80
}]

// HeaderUser测试数据
var userContent = {
  userImg: 'dist/img/user2-160x160.jpg',
  userImgAlt: 'User Image',
  userName: '王大卫',
  userMessage: 'Alexander Pierce - Web Developer<small>Member since Nov. 2012</small>',
  userProfile: '详细',
  userProfileLink: '#',
  userSingOut: '退出',
  userSingOutLink: '#'
}
var userBodys = [
  {href: '#', title: 'Followers'},
  {href: '#', title: 'Sales'},
  {href: '#', title: 'Friends'}
]

class Header extends Component {
    render () {
        return (
            <HeaderBar>
                <Logo
                    href="index.html"
                    logoMini="<b>A</b>LT"
                    logoLg="<b>Admin</b>LTE"  />
                <Navbar>
                  <HeaderMessage messages={messages} />
                  <HeaderNotification notifications={notifications} />
                  <HeaderTasks tasks={tasks} />
                  <HeaderUser
                    userContent={userContent}
                    userBodys={userBodys} />
                  {/*<!-- Control Sidebar Toggle Button -->*/}
                  <li>
                    <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                  </li>
                </Navbar>
            </HeaderBar>
        )
    }
}

export default Header
