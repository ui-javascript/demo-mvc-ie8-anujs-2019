import React, { Component, PropTypes } from 'react'

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import Badge from '../components/Badge'
import Progressbar from '../components/Progressbar'
import { Table, Pagination } from 'react-bootstrap'

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
    name: "TableSimple",
    active: true
  }
]

class TableSimple extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activePage: 1
    }
  }

  handleSelect(eventKey) {
   this.setState({
     activePage: eventKey,
   })
  }

  render () {
    return (
      <div>
        <ContentHeader content="Simple Tables" title="preview of simple tables">
          <Breadcrumb breads={breads} />
        </ContentHeader>
        <section className="content">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Bordered Table</h3>
              <div className="box-tools">
                <div className="input-group input-group-sm" style={{'width': '150px'}}>
                  <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                  <div className="input-group-btn">
                    <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-body">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th>Label</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Update software</td>
                    <td><Progressbar theme="red" xxs={true} striped={true} value={60} /></td>
                    <td><Badge theme="bg-red">60%</Badge></td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Clean database</td>
                    <td><Progressbar theme="yellow" xxs={true} striped={true} value={40} /></td>
                    <td><Badge theme="bg-yellow">40%</Badge></td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Cron job running</td>
                    <td><Progressbar xxs={true} striped={true} value={70} active={true} /></td>
                    <td><Badge theme="bg-light-blue">70%</Badge></td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Fix and squish bugs</td>
                    <td><Progressbar theme="success" xxs={true} striped={true} value={60} /></td>
                    <td><Badge type="label" theme="label-success">60%</Badge></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="box-footer clearfix" style={{'padding': '5px'}}>
              <div className="pull-right">
                <Pagination
                  bsSize="small"
                  items={10}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect.bind(this)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

TableSimple = Pages(TableSimple)

export default TableSimple
