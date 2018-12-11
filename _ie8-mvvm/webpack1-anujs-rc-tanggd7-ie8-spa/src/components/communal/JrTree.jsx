/**
 * @author 方磊 2018-05-29
 * @deprecated ztree封装
 */

import React, { Component, PropTypes } from 'react';
import 'ztree';
import 'ztree/css/zTreeStyle/zTreeStyle.css';
import './style/tree.less';
/* eslint import/no-extraneous-dependencies: 0 */
import jquery from 'jquery';

export default class JrTree extends Component {
  static propTypes = {
    id: PropTypes.string, // ztree 在 html 中 id
    // onClick: PropTypes.func, // 节点点击事件
    // nodes: PropTypes.array, // 节点信息组成的数组
    // check: PropTypes.bool, // 节点前是否显示多选框
    // chkboxType: PropTypes.object, // 勾选 checkbox 对于父子节点的关联关系
    // getTreeObj: PropTypes.func, // 获取 tree 对象，参数 obj：tree对象
    afreshTree: PropTypes.bool, // 是否需要重新生成 tree , 初始化时不起作用
    // expandAll: PropTypes.bool, // 是否展开全部节点
  };

  static defaultProps = {
    id: '',
    // onClick: null,
    // nodes: [],
    // check: true,
    // chkboxType: {},
    // getTreeObj: null,
    afreshTree: false,
    // expandAll: false,
  };

  componentWillMount = () => {
    const { id, afreshTree } = this.props;
    this.treeId = id || 'ztree';
    this.afreshTree = afreshTree;
  };

  componentDidMount = () => {
    this.initTree(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const { afreshTree } = nextProps;
    if (afreshTree) {
      this.treeObj.destroy();
      this.initTree(nextProps);
    }
  };

  initTree = props => {
    const {
      nodes: zTreeNodes,
      onClick,
      check,
      chkboxType,
      getTreeObj,
      expandAll,
    } = props;
    if (zTreeNodes) {
      const setting = {
        callback: {
          onClick: (event, treeId, treeNode) => {
            if (onClick) {
              onClick(treeNode);
            }
          },
        },
        check: {
          enable: check,
          chkboxType,
        },
      };
      this.treeObj = jquery.fn.zTree.init(
        jquery(`#${this.treeId}`),
        setting,
        zTreeNodes
      );
      if (getTreeObj) {
        getTreeObj(this.treeObj);
      }
      // 是否默认展开全部节点
      if (expandAll) {
        this.treeObj.expandAll(true);
      }
    }
  };

  render() {
    return <div id={this.treeId} className="ztree" />;
  }
}
