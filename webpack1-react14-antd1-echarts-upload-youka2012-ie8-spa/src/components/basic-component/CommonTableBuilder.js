import React, {Component} from 'react';
import myAxios from '../../utils/myAxios';
import {Row, Col, Card, Table, Button, Popconfirm, Message} from 'antd';

import './CommonTableBuilder.css'
import {permissionCheck} from "../common-tools/PermissionCheck";

let queryKey = 'name';
let totalItems = 10;
let pageSize = 10;
let currentPage = 1;

class CommonTable extends Component {
    constructor(props) {
        super(props);
        console.log('********table init!!');
        const _options = props._options;
        queryKey = _options.queryKey ? _options.queryKey : queryKey;
        let _add = false, _edit = false, _delete = false;
        _options.commonRowActions && _options.commonRowActions.forEach((item) => {
            switch (item) {
                case 'add':
                    _add = true;
                    break;
                case 'edit':
                    _edit = true;
                    break;
                case 'delete':
                    _delete = true;
                    break;
                default:
                    break;
            }
        });
        this.state = {
            withDefaultQuery: _options.commonHeaderActions && _options.commonHeaderActions.indexOf('query') > -1 ? true : false,
            queryParamsFromProps: props.queryParamsFromProps,
            columns: _options.commonRowActions && _options.commonRowActions.length > 0 ? _options.columns.concat({
                title: '操作',
                key: 'item-operation',
                render: (text) => (
                    <div>
                        {_add ? permissionCheck(_options.commonPermissions.add)(
                            <Button key='add' type='primary'
                                    size='small'
                                    onClick={this.handleRowAddClick(text)}
                                    data-needpermission={_options.commonPermissions.add}>&nbsp;&nbsp;新&nbsp;增&nbsp;&nbsp;
                            </Button>)
                            : null}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {_edit ? permissionCheck(_options.commonPermissions.edit)(
                            <Button key='edit'
                                    type='primary'
                                    size='small' className='edit-btn'
                                    onClick={this.handleRowEditClick(text)}
                                    data-needpermission={_options.commonPermissions.edit}>&nbsp;&nbsp;修&nbsp;改&nbsp;&nbsp;
                            </Button>) : null}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {_delete ? permissionCheck(_options.commonPermissions.delete)(
                            <Popconfirm placement='top' title='确定删除吗？' onConfirm={this.handleRowDeleteClick(text)}>
                                <Button key='delete' type='primary' size='small' className='danger-btn'
                                        data-needpermission={_options.commonPermissions.delete}>&nbsp;&nbsp;删&nbsp;除&nbsp;&nbsp;
                                </Button>
                            </Popconfirm>) : null}
                    </div>
                )
            }) : _options.columns,
            tableData: [],
            loading: false,
            selectedRowKeys: [],
            selectedRows: [],
            noPagination: _options.noPagination,
        }
    }

    componentDidMount() {
        const param = {};
        if (this.state.withDefaultQuery) {
            param[queryKey] = '';
        }
        this.loadTableData(param);
    }

    componentWillReceiveProps(nextProps) {
        console.log('******props!', nextProps);
        const oldPropsParams = this.props.queryParamsFromProps;
        const newPropsParams = nextProps.queryParamsFromProps;
        if (newPropsParams && JSON.stringify(oldPropsParams) !== JSON.stringify(newPropsParams)) {
            const param = {};
            if (this.state.withDefaultQuery) {
                const name = this.refs.itemName.value;
                param[queryKey] = name;
            }
            for (const p in newPropsParams) {
                if (newPropsParams.hasOwnProperty(p)) {
                    param[p] = newPropsParams[p];
                }
            }
            this.loadTableData(param);
        }
    }

    onSelectRowChange(selectedRowKeys, selectedRows) {
        this.setState({selectedRowKeys, selectedRows});
    }

    handleRowAddClick(text) {
        return () => {
            console.log(text);
            this.props.history.push({
                pathname: this.props.match.path + '/add',
                search: text.id + '',
            });
        }
    }

    handleRowEditClick(text) {
        return () => {
            this.props.history.push({
                pathname: this.props.match.path + '/edit/' + text.id,
                state: text,
            });
        }
    }

    handleRowDeleteClick(text) {
        return () => {
            this.doDeleteOne(text.id);
        }
    }

    doDeleteOne(id) {
        myAxios.delete(this.props._options.targetUrl + '/' + id).then((res) => {
            Message.success('删除成功！');
            /*this.setState({
                selectedRowKeys: [],
            });*/
            const param = {};
            if (this.state.withDefaultQuery) {
                const name = this.refs.itemName.value;
                param[queryKey] = name;
            }
            this.loadTableData(param);
        }).catch(err => {
            Message.error('操作失败！');
        });
    }

    loadTableData(params) {
        console.log('TableData params  ', params);
        params = params || {};
        if (!this.state.noPagination) {
            params.limit = pageSize;
            params.offset = (currentPage - 1) * pageSize;
        }
        this.setState({loading: true});
        myAxios.get(this.props._options.targetUrl, {params}).then(data => {
            console.log('TableData  res data', data);
            const funMap = this.props._options.tableDataMap;
            data = funMap && typeof funMap === 'function' ? funMap(data) : data;
            if (!this.state.noPagination) {
                totalItems = data.iTotalRecords;
                this.setState({
                    tableData: data.aaData,
                    loading: false,
                });
            } else {
                this.setState({
                    tableData: data,
                    loading: false,
                });
            }
        }).catch(err => {
            Message.error('操作失败！');
            this.setState({loading: false});
        });
    }

    handleQueryItemsClick() {
        const param = {};
        if (this.state.withDefaultQuery) {
            const name = this.refs.itemName.value;
            param[queryKey] = name;
        }
        this.loadTableData(param);
    }

    HandleAddItemClick() {
        this.props.history.push(this.props.match.path + '/add');
    }

    HandleEditItemClick() {
        const keys = this.state.selectedRows;
        if (!keys || keys.length !== 1) {
            Message.warning('请选择一项！');
            return;
        }
        this.handleRowEditClick(keys[0])();
    }

    handleDeleteItemClick() {
        const keys = this.state.selectedRowKeys;
        if (!keys || keys.length === 0) {
            Message.warning('请选择至少一项！');
            return;
        }
        this.doDeleteItems(keys);
    }

    doDeleteItems(ids) {
        myAxios.delete(this.props.targetUrl, {params: {ids: ids}}).then((res) => {
            Message.success('删除成功！');
            this.setState({
                selectedRowKeys: [],
            });
            const param = {};
            if (this.state.withDefaultQuery) {
                const name = this.refs.itemName.value;
                param[queryKey] = name;
            }
            this.loadTableData(param);
        }).catch(err => {
            Message.error('操作失败！');
        });
    }

    render() {
        const _options = this.props._options;
        let _query = false, _add = false, _edit = false, _delete = false;
        /*_options.commonHeaderActions.forEach((item) => {
            switch (item) {
                case 'query':
                    _query = true;
                    break;
                case 'add':
                    _add = true;
                    break;
                case 'edit':
                    _edit = true;
                    break;
                case 'delete':
                    _delete = true;
                    break;
                default:
                    break;
            }
        });*/
        const tableExtra = (
            <div className="actions">
                {
                    _options.commonHeaderActions.map(ItemCom => {
                        if (typeof ItemCom === 'string') {
                            switch (ItemCom) {
                                case 'query':
                                    return (
                                        <span className='common-table-action-item' key='query-action'><input type="text" ref="itemName"
                                                     placeholder="请输入代码或名称&nbsp;&nbsp;"/>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a href="javascript:;" className="btn a-btn view-btn"
                                               onClick={this.handleQueryItemsClick.bind(this)}><i
                                                className="fa fa-search">&nbsp;&nbsp;查找</i></a></span>
                                    );
                                    break;
                                case 'add':
                                    return permissionCheck(_options.commonPermissions.add)(<span className='common-table-action-item' key='add-action'><a
                                        className="btn a-btn primary-btn"
                                        data-needpermission={_options.commonPermissions.add}
                                        href="javascript:;"
                                        onClick={this.HandleAddItemClick.bind(this)}>
                                        <i className="fa fa-plus"></i>&nbsp;&nbsp;新增</a></span>);
                                    break;
                                case 'edit':
                                    return permissionCheck(_options.commonPermissions.edit)(<span className='common-table-action-item' key='edit-action'><a
                                        className="btn a-btn edit-btn"
                                        data-needpermission={_options.commonPermissions.edit}
                                        href="javascript:;"
                                        onClick={this.HandleEditItemClick.bind(this)}>
                                        <i className="fa fa-edit"></i>&nbsp;&nbsp;编辑</a></span>);
                                    break;
                                case 'delete':
                                    return permissionCheck(_options.commonPermissions.delete)(
                                        <Popconfirm placement='bottom' title='确认删除所选择的项目？'
                                                    onConfirm={this.handleDeleteItemClick.bind(this)}>
                                            <span className='common-table-action-item' key='delete-action'><a className="btn a-btn danger-btn"
                                               data-needpermission={_options.commonPermissions.delete}
                                               href="javascript:;">
                                                <i className="fa fa-trash"></i>&nbsp;&nbsp;删除</a></span>
                                        </Popconfirm>);
                                    break;
                                default:
                                    return null;
                                    break;
                            }
                        } else if (typeof ItemCom === 'function') {
                            return <span key={'custom-action'+Math.random()}><ItemCom onSubmit={this.loadTableData.bind(this)}/></span>;
                        } else if (typeof ItemCom === 'object') {
                            permissionCheck(ItemCom.needPermissions)(<span className='common-table-action-item' key={'custom-action'+ItemCom.name}><a className={"btn a-btn "+ItemCom.css}
                                                                     data-needpermission={ItemCom.needPermission}
                                                                     href="javascript:;" onClick={() => {
                                ItemCom.action.bind(this)(this.state.selectedRowKeys, this.state.selectedRows, this.loadTableData.bind(this))
                            }}>
                                <i className={ItemCom.icon}></i>&nbsp;&nbsp;{ItemCom.name}
                            </a></span>)
                        } else {
                            return null
                        }
                    })
                }
                &nbsp;&nbsp;
                {
                    _options.extraHeaderActionButtons && _options.extraHeaderActionButtons.map((item => (
                        permissionCheck(item.needPermissions)(<a className={"btn a-btn "+item.css}
                                                                 data-needpermission={item.needPermission}
                                                                 href="javascript:;" onClick={() => {
                            item.action.bind(this)(this.state.selectedRowKeys, this.state.selectedRows, this.loadTableData.bind(this))
                        }}>
                            <i className={item.icon}></i>&nbsp;&nbsp;{item.name}&nbsp;&nbsp;
                        </a>))))
                }
            </div>
        );
        const {loading, selectedRowKeys, noPagination} = this.state;
        //选择项是否受控
        const _selectedRowKeys = this.props.selectedRowKeys !== undefined && this.props.selectedRowKeys !== null ? this.props.selectedRowKeys : selectedRowKeys;
        const _selectRowChange = this.props.onSelectRowChange !== undefined && this.props.onSelectRowChange !== null ? this.props.onSelectRowChange : this.onSelectRowChange.bind(this);
        const rowSelection = {
            selectedRowKeys:_selectedRowKeys,
            onChange: _selectRowChange,
        };
        const pagination = noPagination ? false : {
            total: totalItems,
            showSizeChanger: true,
            page: currentPage,
            pageSize: pageSize,
            onShowSizeChange: (_current, _pageSize) => {
                currentPage = _current;
                pageSize = _pageSize;
                this.handleQueryItemsClick();
            },
            onChange: (current) => {
                console.log(current);
                currentPage = current;
                this.handleQueryItemsClick();
            },
            pageSizeOptions: ['10', '25', '50', '100'],
            showTotal: (total) => {
                return this.state.tableData ? this.state.tableData.length + '/' + total : 0 + '/' + total;
            }
        };

        return (
            <Row>
                <Col span={24}>
                    <div className='right-wrapper'>
                        <Card title={this.props._options.title} extra={tableExtra}>
                            <div className='table-wrapper'>
                                <Table rowSelection={this.props._options.noCheckbox ? null : rowSelection}
                                       columns={this.state.columns} loading={loading}
                                       dataSource={this.state.tableData} pagination={pagination}
                                       rowKey={_options.rowKey ? _options.rowKey : 'id'}
                                />
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        );
    }
}

const commonTableBuilder = (_options) => {
    return (props) => <CommonTable {...props} _options={_options}/>;
};

export default commonTableBuilder;