import React, { Component } from 'react';
import { Table, Progress } from 'antd';
const columns = [{
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
}, {
    title: '公司名称',
    dataIndex: 'custName',
    key: 'custName',
}, {
    title: '类型',
    dataIndex: 'custType',
    key: 'custType',
}, {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    render: number => <Progress percent={number} />
}];

class Tables extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }
    componentWillMount(){
    }
    render() {
        let {data} = this.props;
        return (
            <div><Table columns={columns} dataSource={data} /></div>
        );
    }

}
export {Tables}