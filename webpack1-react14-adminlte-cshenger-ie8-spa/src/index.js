import 'babel-polyfill';
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

require('../public/dist/css/other/ui.css')
//require('../public/plugins/jquery/jquery.min.js')
//require('../public/plugins/bootstrap/dist/js/bootstrap.min.js')
// require('../public/dist/js/adminlte.min.js')

import Box from './components/Box'
import Header from './components/Header/'
import Footer from './components/Footer/'
import MainSidebar from './components/MainSidebar'
import { Pulls, ItemHeader, ItemOne, ItemList } from './components/MainSidebar/SidebarItem'
import SidebarSearch from './components/MainSidebar/SidebarSearch'
import SidebarUserPanel from './components/MainSidebar/SidebarUserPanel'
import Widgets from './pages/Widgets'
import TimelineDemo from './pages/TimelineDemo'
import EchartsDemo from './pages/EchartsDemo'
import General from './pages/General'
import Modals from './pages/Modals'
// import Advanced from './pages/Advanced' 部分jQuery插件在IE8下有兼容问题，故默认不在此展示，可到相关页面查看
import TableSimple from './pages/TableSimple'
import TablesDatas from './pages/TablesDatas'

// SidebarUserPanel测试数据
var userPanels = {
  imgs: "public/dist/imgs/user2-160x160.jpg",
  imgsAlt: "User Image",
  title: "Alexander Pierce",
  userLink: '#',
  isOnline: true
}

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <MainSidebar
          userPanel={<SidebarUserPanel userPanels={userPanels} />}
          search={<SidebarSearch action="https://cn.bing.com/search?q=" />}>
          <ItemHeader title="Hello World" />
          <ItemOne url="/widgets" dataTitle="notice-widgets" icon="fa-th" iconTheme="text-aqua" name="Widgets" pulls={[{theme: 'bg-blue', content: '12'}]} />
          <ItemList url="javascript:void(0);" dataTitle="notice-uiElements" icon="fa-laptop" name="UI Elements">
            <ItemOne url="/ui/timeLine" dataTitle="notice-uiElements-timeline" icon="fa-clock-o" name="Timeline" />
            <ItemOne url="/ui/general" dataTitle="notice-uiElements-general" icon="fa-circle-o" name="General" />
            <ItemOne url="/ui/modals" dataTitle="notice-uiElements-modals" icon="fa-circle-o" name="Modals" />
          </ItemList>
          <ItemList url="javascript:void(0);" dataTitle="notice-uiElements" icon="fa-edit" name="Forms">
            <ItemOne url="/forms/advanced" dataTitle="notice-uiElements-Advanced" icon="fa-circle-o" name="Advanced Elements(不展示)" />
          </ItemList>
          <ItemOne url="/echarts" dataTitle="notice-echarts" icon="fa-pie-chart" name="Echarts" />
          <ItemList url="javascript:void(0);" dataTitle="notice-tables" icon="fa-edit" name="Tables">
            <ItemOne url="/tables/tablesimple" dataTitle="notice-tables-TableSimple" icon="fa-circle-o" name="Table Simple" />
            <ItemOne url="/tables/tablesdatas" dataTitle="notice-tables-TableDatas" icon="fa-circle-o" name="Table Datas" />
          </ItemList>
        </MainSidebar>
        {/* react-router render at here */}
        {this.props.children}
        <Footer content="Any you want">
          <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
        </Footer>
      </div>
    )
  }
}

const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Widgets },
    childRoutes: [
      { path: 'widgets', component: Widgets },
      { path: '/ui/timeline', component: TimelineDemo },
      { path: '/ui/general', component: General },
      { path: '/ui/modals', component: Modals },
      // { path: '/forms/advanced', component: Advanced },
      { path: 'echarts', component: EchartsDemo },
      { path: '/tables/tablesimple', component: TableSimple },
      { path: '/tables/tablesdatas', component: TablesDatas },
    ]
  }
]

ReactDOM.render(
  <Router routes={routeConfig} />,
  document.getElementById('app')
);
