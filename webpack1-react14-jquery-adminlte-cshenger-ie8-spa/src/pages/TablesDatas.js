import React, { Component, PropTypes } from 'react'

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import TableData from '../components/TableData'

// 面包屑测试数据
var breads = [
  {
    icon: "fa fa-dashboard",
    url: "#",
    name: "Home",
    active: false
  },
  {
    url: "#",
    name: "TableDatas",
    active: true
  }
]

// 测试数据
var datas = {
  thead: [
    'Rendering engine',
    'Browser',
    'Platforms(s)',
    'Engine version',
    'CSS grade'
  ],
  tbody: [
    ['Trident', 'AOL browser (AOL desktop)', 'Win XP', 6, 'A'],
    ['Gecko', 'Epiphany 2.20', 'Gnome', 1.8, 'X'],
    ['Misc', 'IE Mobile', 'Windows Mobile 6', 0, 'B'],
    ['Tasman', 'Lynx', 'Win XP', 2, 'C'],
    ['Misc', 'OmniWeb 5.5', 'Text only', 7, 'A'],
    ['Presto', 'NetFront 3.4', 'Mac OS 8-9', 1, 'D'],
    ['Gecko', 'Nokia N800', 'OSX.3+', 2.8, 'F'],
    ['Presto', 'Internet Explorer 4.5', 'PSP', 3.4, 'E'],
    ['Trident', 'Nokia N800', 'S60', 4, 'C'],
    ['KHTML', 'AOL browser (AOL desktop)', 'iPod', 9, 'D'],
    ['Misc', 'OmniWeb 5.5', 'Gnome', 3, 'E'],
    ['Trident', 'AOL browser (AOL desktop)', 'Win XP', 6, 'A'],
    ['Gecko', 'NetFront 3.4', 'Gnome', 2.2, 'X'],
    ['Presto', 'IE Mobile', 'Windows Mobile 6', 0, 'O'],
    ['Tasman', 'Safari 2.0', 'S60', 2, 'C'],
    ['Misc', 'NetFront 3.4', 'Text only', 7, 'A'],
    ['Presto', 'NetFront 3.4', 'Mac OS 8-9', 1, 'C'],
    ['Misc', 'Lynx', 'OSX.3+', 9.5, 'F'],
    ['Presto', 'Internet Explorer 4.5', 'PSP', 3.4, 'E'],
    ['Trident', 'Lynx', 'S60', 4, 'C'],
    ['KHTML', 'AOL browser (AOL desktop)', 'iPod', 5, 'F'],
    ['Tasman', 'Lynx', 'Gnome', 3, 'E'],
  ]
}

class TablesDatas extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <ContentHeader content="Data Tables" title="advanced tables">
          <Breadcrumb breads={breads} />
        </ContentHeader>
        <section className="content">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Hover Data Table</h3>
            </div>
            <div className="box-body">
              <TableData datas={datas} pagelistNum={5} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

TablesDatas = Pages(TablesDatas)

export default TablesDatas
