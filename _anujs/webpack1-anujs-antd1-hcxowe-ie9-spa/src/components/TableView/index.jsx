import React, { Component } from 'react'
import './index.less'

import { Table, Icon } from 'antd'

class TableView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const dataSource = []

        for(let i=0; i<48; i++) {
            dataSource.push({
                key: ''+i,
                name: '胡彦斌'+i,
                age: 20 + i,
                address: `西湖区湖底公园${i}号`
            })
        }
            
        /* const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, 
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, 
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ]; */
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href="#">{text}</a>,
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record) => (
                <span>
                    <a href="#">操作一{record.name}</a>
                    <span className="ant-divider"></span>
                    <a href="#" className="ant-dropdown-link">
                        更多 <Icon type="down" />
                    </a>
                </span>
            ),
        }];

        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
                console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === '胡彦斌1',    // 配置无法勾选的列
            })
        };

        const pagination = {
            total: dataSource.length,
            showSizeChanger: true,
            pageSize: 50,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            },
        };

        return (
            <div class="table-wrapper">
                <Table rowSelection={rowSelection} 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={pagination} 
                    scroll={{ y: 240 }}
                    bordered
                    title={() => '页头'}
                    footer={() => '页脚'}
                    expandedRowRender={record => <p>{record.name}</p>}
                />
            </div>
        ) 
    }
}

export default TableView