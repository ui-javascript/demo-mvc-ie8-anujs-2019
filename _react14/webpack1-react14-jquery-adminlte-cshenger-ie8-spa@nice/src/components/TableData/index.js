import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

class TableData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      datas: this.props.datas,
      sortNums: [],
      insertList: [],
      pageCount: 0,
      initPage: 0,
      pagelistNum: this.props.pagelistNum
    }
  }

  componentWillMount () {
    let leng = this.props.datas.thead.length
    this.setState({
      sortNums: Array.from({length: leng}, v => 0),
      insertList: this.state.datas.tbody.slice(this.state.pagelistNum*this.state.initPage, this.state.pagelistNum*(this.state.initPage+1)),
      pageCount: this.props.datas.tbody.length / this.state.pagelistNum
    })
  }

  componentDidMount () {
    for (var i=0; i<this.state.sortNums.length; i++) {
      i == 0 ? this.state.sortNums[i] = -1 : this.state.sortNums[i] = 0;
    }
    this.state.datas.tbody.sort(this.sortAscen(0))
    this.setState({
      datas: this.state.datas,
      sortNums: this.state.sortNums,
      insertList: this.state.datas.tbody.slice(this.state.pagelistNum*this.state.initPage, this.state.pagelistNum*(this.state.initPage+1))
    })
  }

  componentDidUpdate () {
    //console.log(this.state.sortNums)
    //console.log(this.state.initPage)
    //console.log(this.state.datas.tbody)
    //console.log(this.state.insertList)
  }

  handlePageClick (e) {
    this.setState({
      initPage: e.selected,
      insertList: this.state.datas.tbody.slice(this.state.pagelistNum*e.selected, this.state.pagelistNum*(e.selected +1))
    })
  }

  handleSort (index) {
    let len = this.state.sortNums.length
    let nums = this.state.sortNums
    let num = this.state.sortNums[index]
    let tbodys = this.state.datas.tbody

    if (num == 0 || num == 1) {
      for (var i=0; i<len; i++) {
      	i == index ? nums[i] = -1 : nums[i] = 0;
      }
      tbodys.sort(this.sortAscen(index))
    } else if (num == -1) {
      for (var i=0; i<len; i++) {
      	i == index ? nums[i] = 1 : nums[i] = 0;
      }
      tbodys.sort(this.sortDescen(index))
    }
    this.setState({
      datas: this.state.datas,
      sortNums: nums,
      insertList: this.state.datas.tbody.slice(this.state.pagelistNum*this.state.initPage, this.state.pagelistNum*(this.state.initPage+1))
    })
  }

  sortAscen (index) {
    let han = /^[\u4e00-\u9fa5]+$/;

    return (x, y) => {
      if ((typeof(x[index]) == "number") && (typeof(y[index]) == "number")) {
        return x[index] - y[index]
      } else if ((typeof(x[index]) == "string") && (typeof(y[index]) == "string")) {
        if (han.test(x[index]) && han.test(y[index])) {
          return x[index].substring(0,1).localeCompare(y[index].substring(0,1), 'zh') == -1
        } else {
          let xlow = x[index].substring(0,1).toLocaleLowerCase()
          let ylow = y[index].substring(0,1).toLocaleLowerCase()
          if (xlow < ylow) {
              return -1;
          } else if (xlow > ylow) {
              return 1;
          } else {
              return 0;
          }
        }
      }
    }
  }

  sortDescen (index) {
    let han = /^[\u4e00-\u9fa5]+$/;

    return (x, y) => {
      if (typeof(x[index]) == "number" && typeof(y[index]) == "number") {
        return y[index] - x[index]
      } else if (typeof(x[index]) == "string" && typeof(y[index]) == "string") {
        if (han.test(x[index]) && han.test(y[index])) {
          return x[index].substring(0,1).localeCompare(y[index].substring(0,1), 'zh') == 1;
        } else {
          let xlow = x[index].substring(0,1).toLocaleLowerCase()
          let ylow = y[index].substring(0,1).toLocaleLowerCase()
          if (xlow < ylow) {
              return 1;
          } else if (xlow > ylow) {
              return -1;
          } else {
              return 0;
          }
        }
      }
    }
  }

  render () {
    let datas = this.state.datas
    let self = this

    return (
      <div>
        <table className="table table-bordered table-condensed table-hover">
          <thead>
            <tr>
              {datas.thead.map((title, index) => {
                let sortnum = this.state.sortNums[index]
                let icon = "fa-sort"
                if (sortnum == 0) {
                  icon = "fa-sort"
                } else if (sortnum == 1) {
                  icon = "fa-sort-amount-desc"
                } else if (sortnum == -1) {
                  icon = "fa-sort-amount-asc"
                }

                return (
                  <th
                    style={{cursor: "pointer"}}
                    data-sort={sortnum}
                    onClick={self.handleSort.bind(this, index)}>
                    {title}
                    <i
                      className={"fa "+icon}
                      style={{float: "right", color: "#9e9e9e", marginRight: "2px", position: "relative", top: "2px"}}></i>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.insertList.map((messages, index) => {
              return (
                <tr key={index}>
                  {messages.map((mes, index) => {
                    return <td>{mes}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              {datas.thead.map((title, index) => {
                return <th>{title}</th>
              })}
            </tr>
          </tfoot>
        </table>
        <div style={{float: "right"}}>
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<a href="###">...</a>}
                         breakClassName={"break-me"}
                         pageCount={this.state.pageCount}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={3}
                         onPageChange={this.handlePageClick.bind(this)}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        </div>
      </div>
    )
  }
}

TableData.propTypes = {
  pagelistNum: PropTypes.number
}

TableData.defaultProps = {
  pagelistNum: 10
}

export default TableData
