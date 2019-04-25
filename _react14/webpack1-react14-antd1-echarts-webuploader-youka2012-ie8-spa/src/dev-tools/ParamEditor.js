import React, {Component, PropTypes} from 'react';
import {Table, Input, Button, Card,message} from 'antd'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{key: 0, name: '', value: '', desc: '', valid: false}],
        };
        this.uuid = 1;
    }

    componentWillReceiveProps(np, ns) {
        return JSON.stringify(ns) !== JSON.stringify(this.state)
    }

    onInputChange = (e, key, col) => {
        const tData = this.state.data;
        tData.forEach(item => {
            if (item.key === key) {
                item[col] = e.target.value
            }
        });
        this.setState({
            data: tData
        },()=>{
            this.onDataChange();
        });

    };

    deleteRow = (key) => {
        this.setState({
            data: this.state.data.filter(item => item.key !== key),
        },()=>{
            this.onDataChange();
        });

    };
    addRow = () => {
        const key = this.uuid++;
        this.setState({
            data: this.state.data.concat({key, name: '', value: '', desc: '', valid: false}),
        })
    };

    onDataChange = () => {
        this.props.onChange && this.props.onChange(this.state.data.filter(item => item.valid && item.name));
    };

    render() {
        const {data: tableData} = this.state;
        const dataSource = tableData.map((item, index) => {
            item.row = index;
            return item;
        });
        const tableColumns = [
            {
                key: 'name', title: '参数名', width: '130px', render: (text, record) => (
                    <Input value={text.name} onChange={(e) => {
                        this.onInputChange(e, text.key, 'name')
                    }}/>
                )
            },
            {
                key: 'value', title: '参数值', width: '280px', render: (text, record) => (
                    <Input value={text.value} onChange={(e) => {
                        this.onInputChange(e, text.key, 'value')
                    }}/>
                )
            },
            {
                key: 'desc', title: '描述', width: '200px', render: (text, record) => (
                    <Input value={text.desc} onChange={(e) => {
                        this.onInputChange(e, text.key, 'desc')
                    }}/>
                )
            },
            {
                key: 'operation', title: '操作', width: '110px', render: (text, record) => {
                    return <div>{text.row === 0 && this.state.data.length <= 1 ? null :
                        <Button type='dashed' size='small' onClick={() => {
                            this.deleteRow(text.key)
                        }}>删除</Button>}&nbsp;&nbsp;&nbsp;{text.row === this.state.data.length - 1 ?
                        <Button size='small' onClick={this.addRow}>增加</Button> : null}</div>;
                }
            },
        ];
        const rowSelection = {
            onChange: (keys, rows) => {
                this.setState({
                    data: tableData.map(item => {
                        if (keys.indexOf(item.key) > -1) {
                            item.valid = true;
                        } else {
                            item.valid = false;
                        }
                        return item;
                    }),
                },()=>{
                    this.onDataChange();
                });
            }
        };
        return (
            <Card>
                <Table rowSelection={rowSelection} columns={tableColumns} dataSource={dataSource}
                       scroll={{y: 350}} pagination={false}/>
            </Card>
        )
    }
}

MyComponent.propType = {
    onChange: PropTypes.func,
};

export default MyComponent;