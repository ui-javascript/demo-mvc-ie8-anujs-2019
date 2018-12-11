/**
 * @author 汤国栋 2018-09-17 14:50:31
 * @deprecated 查询列表组件（查询条件、工具栏、表格列表）
 */
import React, { Component, PropTypes } from 'react';
import Condition from './condition';
import Toolbar from './toolbar';
import JrGrid from '../JrGrid';
import './index.less';

class JrQueryGridPage extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired, // 表格参数
    data: PropTypes.array.isRequired, // 表格数据
    total: PropTypes.number.isRequired, // 总记录数
    conditions: PropTypes.array, // 普通条件
    advancedConditions: PropTypes.array, // 高级条件
    toolbar: PropTypes.array, // 工具栏
    menucode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 菜单代码
    singleCheck: PropTypes.bool, // 单选中行
    loadData: PropTypes.func.isRequired, // 加载表格数据
  };

  static defaultProps = {
    conditions: [],
    advancedConditions: [],
    toolbar: [],
    menucode: '',
    singleCheck: false,
  };

  constructor(props, context) {
    super(props, context);
    this.currentPage = 1;
    this.form = {};
  }

  onInitGrid = gridObj => {
    this.gridObj = gridObj;
  };

  // 查询条件查询按钮点击事件
  onSearchClick = form => {
    this.form = form;
    this.currentPage = 1;
    this.gridObj.showLoading();
    this.loadData(1, this.pageSize, form);
  };

  // 刷新表格
  reloadGrid = () => {
    this.gridObj.showLoading();
    this.loadData(this.currentPage, this.pageSize, this.form);
  };

  loadData = (currentPage, pageSize, form) => {
    const { loadData } = this.props;
    loadData(currentPage, pageSize, form);
  };

  onCurrentPageOrSizeChange = (currentPage, pageSize) => {
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    const { loadData } = this.props;
    loadData(currentPage, pageSize, this.form);
  };

  // 获取选中行数据
  getSelectRows = () => this.gridObj.selectedRows();

  // 获取查询条件
  getConditions = () => this.form;

  render() {
    const {
      columns,
      data,
      total,
      conditions,
      advancedConditions,
      toolbar,
      menucode,
      singleCheck,
    } = this.props;
    return (
      <div>
        <Condition
          conditions={conditions}
          advancedConditions={advancedConditions}
          onSearchClick={this.onSearchClick}
          onRefreshClick={this.reloadGrid}
        />
        <Toolbar
          menucode={menucode}
          toolbar={toolbar}
          reloadGrid={this.reloadGrid}
          getSelectRows={this.getSelectRows}
          getConditions={this.getConditions}
        />
        <JrGrid
          onInit={this.onInitGrid}
          currentPage={this.currentPage}
          total={total}
          cols={columns}
          data={data}
          height={400}
          singleCheck={singleCheck}
          onCurrentPageOrSizeChange={this.onCurrentPageOrSizeChange}
        />
      </div>
    );
  }
}

export default JrQueryGridPage;
