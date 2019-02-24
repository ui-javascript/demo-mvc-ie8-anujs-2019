import React, { Component } from 'react'
import './index.less'

import { Tree } from 'antd'

const TreeNode = Tree.TreeNode;

class TreeView extends Component {
    constructor(props) {
        super(props)

        /* const keys = props.keys || ['0-0-0', '0-0-1']

        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
        } */

        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        }

        this.onExpand = this.onExpand.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onExpand(expandedKeys) {
        console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded chilren keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
    }
    onCheck(checkedKeys) {
        this.setState({
          checkedKeys,
          selectedKeys: ['0-3', '0-4'],
        });
    }
    onSelect(selectedKeys, info) {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }

    /* onSelect(info) {
        console.log('selected', info);
    }
    onCheck(info) {
        console.log('onCheck', info);
    } */

    render() {
        const x = 3;
        const y = 2;
        const z = 1;
        const gData = [];

        const generateData = (_level, _preKey, _tns) => {
        const preKey = _preKey || '0';
        const tns = _tns || gData;

        const children = [];
        for (let i = 0; i < x; i++) {
            const key = `${preKey}-${i}`;
            tns.push({ title: key, key });
            if (i < y) {
            children.push(key);
            }
        }
        if (_level < 0) {
            return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
            tns[index].children = [];
            return generateData(level, key, tns[index].children);
        });
        };
        generateData(z);
        const loop = data => data.map((item) => {
            if (item.children) {
              return (
                <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
                  {loop(item.children)}
                </TreeNode>
              );
            }
            return <TreeNode key={item.key} title={item.key} />;
        });
        return (
            <div class="tree-wrapper">
                {/* <div>
                    <Tree className="myCls" showLine checkable
                        defaultExpandedKeys={this.state.defaultExpandedKeys}
                        defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultCheckedKeys={this.state.defaultCheckedKeys}
                        onSelect={this.onSelect} onCheck={this.onCheck}
                    >
                        <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="parent 1-0" key="0-0-0" disabled>
                            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                            <TreeNode title="leaf" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                        </TreeNode>
                        </TreeNode>
                    </Tree>
                </div> */}
                <div>
                    <Tree
                        checkable
                        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
                    >
                        {loop(gData)}
                    </Tree>
                </div>
            </div>
        )
    }
}

export default TreeView