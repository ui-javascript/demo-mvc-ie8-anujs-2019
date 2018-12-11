/**
 * @author 汤国栋 2018-09-11 08:41:02
 * @deprecated 表格组件
 */
/* eslint import/no-extraneous-dependencies: 0 */
import React, { Component, PropTypes } from 'react';
import jquery from 'jquery';
import MMGrid from './mmGrid';
import MMPaginator from './mmPaginator';

import './mmGrid.css';
import './mmPaginator.css';

MMGrid(jquery); // 初始化表格
MMPaginator(jquery); // 初始化分页

class JrGrid extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired, // 表格参数
    data: PropTypes.array.isRequired, // 表格数据
    loadonce: PropTypes.bool, // 是否一次加载（默认：false）
    showPagination: PropTypes.bool, // 是否显示分页（默认：true）
    total: PropTypes.number.isRequired, // 总记录数
    currentPage: PropTypes.number, // 当前页码（默认：1）
    pageSize: PropTypes.number, // 每页显示数量（默认：20）
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 表格高度
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 表格宽度
    showCheckbox: PropTypes.bool, // 是否显示多选框（默认：true）
    singleCheck: PropTypes.bool, // 是否只能选中一条数据（默认：false）
    // onSelectRowsChange: PropTypes.func, // 获取当前选中记录的数据
    onCurrentPageOrSizeChange: PropTypes.func, // 页码变化或每页显示数量变化
    // refreshGrid: PropTypes.func, // 刷新列表
    onInit: PropTypes.func, // 初始化，返回 table 相关操作方法（获取行数据等）
  };

  static defaultProps = {
    currentPage: 1,
    pageSize: 20,
    loadonce: false,
    showPagination: true,
    showCheckbox: true,
    singleCheck: false,
    // onSelectRowsChange: () => {},
    onCurrentPageOrSizeChange: () => {},
    height: '280px',
    width: 'auto',
    onInit: () => {},
  };

  constructor(props) {
    super(props);

    const id = Math.random()
      .toString()
      .replace('.', '');
    this.state = {
      tableId: `table-${id}`,
      pgId: `pg-${id}`,
      tableObj: null,
    };
  }

  componentDidMount = () => {
    const { tableId, pgId } = this.state;
    const {
      cols,
      data,
      loadonce,
      total,
      currentPage,
      pageSize,
      showCheckbox,
      singleCheck,
      showPagination,
      // onSelectRowsChange,
      onCurrentPageOrSizeChange,
      height,
      width,
      onInit,
    } = this.props;
    const config = {
      cols,
      items: data,
      checkCol: showCheckbox,
      multiSelect: !singleCheck,
      height,
      width,
    };
    if (showPagination) {
      config.plugins = [
        jquery(`#${pgId}`).mmPaginator({
          page: currentPage,
          local: true,
          totalCount: total,
          limit: pageSize,
          onChange: (number, size) => {
            if (loadonce) {
              this.loadonceForPagination(number, size);
            } else {
              const { tableObj } = this.state;
              tableObj.showLoading();
              onCurrentPageOrSizeChange(number, size);
            }
          },
        }),
      ];
    }
    const tableObj = jquery(`#${tableId}`).mmGrid(config);

    // 初始化后，返回表操作方法。
    onInit(tableObj);

    this.setState({ tableObj });
  };

  // 更新表格数据
  componentWillReceiveProps = nextProps => {
    const { tableObj } = this.state;
    tableObj.load(nextProps.data, {
      currentPage: nextProps.currentPage,
    });
  };

  // 一次性加载全部数据，采用分页，需要手动进行计算。
  loadonceForPagination = (number, size) => {
    const start = (number - 1) * size;
    const end = start + size;
    const { tableObj } = this.state;
    const { data } = this.props;
    tableObj.load(data.slice(start, end));
  };

  render() {
    const { tableId, pgId } = this.state;
    const { showPagination } = this.props;
    return (
      <div>
        <table id={tableId} />
        {showPagination && (
          <div style={{ textAlign: 'right' }}>
            <div id={pgId} />
          </div>
        )}
      </div>
    );
  }
}

export default JrGrid;
