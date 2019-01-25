import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { JrTree } from 'ui';
// import { apiUrl, request } from 'tool';
import { tabChange, activeKeyChange } from '../ducks';

// const {} = apiUrl;

// 创建菜单树
const creatMenuTree = (data, nodes = []) => {
  if (data) {
    data.forEach(item => {
      let obj = {};
      if (item.menus.length > 0) {
        obj = {
          id: item.menucode,
          name: item.menuname,
          children: creatMenuTree(item.menus),
        };
      } else {
        obj = {
          id: item.menucode,
          name: item.menuname,
          children: [],
        };
      }
      nodes.push(obj);
    });
  }
  return nodes;
};

// 根据 key，递归查找对应菜单内容。
const findItem = (arr, code) => {
  let result;
  arr.forEach(item => {
    if (!result) {
      if (item.menucode === code) {
        result = item;
      } else if (item.menus.length > 0) {
        const r = findItem(item.menus, code);
        if (r) {
          result = r;
        }
      }
    }
  });
  return result;
};

class Leftbar extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    onTabChange: PropTypes.func.isRequired,
    onActiveKeyChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tabs: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // selectedKeys: '',
      menuList: [], // 菜单列表
      menuNodes: [], // 菜单树
      userName: '测试', // 用户姓名
      unitName: '测试单位', // 单位名称
    };
  }

  componentDidMount = () => {
    // TODO: 调用接口获取 menuList
    const { menuList } = this.state;
    this.setState({ menuNodes: creatMenuTree(menuList) });
  };

  onRbSelect = treeNode => {
    // TODO: 保存 selectedKeys
    const selectedKeys = treeNode.id;
    // this.setState({ selectedKeys });

    const { menuList } = this.state;
    const item = findItem(menuList, selectedKeys.toString());
    if (item) {
      const { menuname, menucode, menus } = item;
      if (!menus.length) {
        const content = <div />;
        // const content = <GetMenu code={menucode} />;
        const newTab = {
          name: menuname,
          code: menucode,
          content: content || menuname,
        };

        // 判断 tabs 内是否已存在相同 key
        const { tabs, onTabChange, onActiveKeyChange } = this.props;
        const activeTab = tabs.filter(obj => obj.code === menucode);
        if (!activeTab.length) {
          onTabChange(tabs.concat(newTab));
        }

        // 保存当前选中标签页
        onActiveKeyChange(newTab.code);
      }
    }
  };

  render() {
    const { userName, unitName, menuNodes } = this.state;
    return (
      <div className="left">
        <div className="leftbar">
          <div className="user_info">
            <div className="title">用户信息</div>
            <div className="detail_container">
              <div className="detail">
                用户名：
                {userName}
              </div>
              <div className="detail">
                单位名称：
                {unitName}
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="title">菜单列表</div>
            <div className="menu_list">
              {menuNodes.length > 0 && (
                <JrTree nodes={menuNodes} onClick={this.onRbSelect} />
              )}
            </div>
          </div>
        </div>
        <div className="toggle_left" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.desktop.tabs,
});

const mapDispatchToProps = {
  onTabChange: tabChange,
  onActiveKeyChange: activeKeyChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leftbar);
