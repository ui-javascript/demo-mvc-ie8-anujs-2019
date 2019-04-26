import React, {Component} from 'react';
import {Table, Button, Form, Input, message} from 'antd';

const FormItem = Form.Item;

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    buildForm = (columns) => {
        console.log('props', this.props);
        console.log('columns', columns);
        const {getFieldProps} = this.props.form;
        if (!columns) {
            return;
        }
        return <Form inline onSubmit={this.onSubmit}>
            {
                columns.map(item => item.isActionType ? null : (
                    <FormItem label={item.title} required={item.required}>
                        <Input {...getFieldProps(item.dataIndex)}/>
                    </FormItem>
                ))
            }
            <FormItem>
                <Button type='primary' htmlType='submit'>确定</Button>
            </FormItem>
        </Form>
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log("1", this.props.form.getFieldsValue());
        const columns = this.props.columns;
        let requiredCollection = {};
        columns.forEach(item => {
            requiredCollection[item.key] = !!item.required;
        });
        const formValue = this.props.form.getFieldsValue();
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const value = formValue[key];
                if (requiredCollection[key] && (value === undefined || value === '')) {
                    message.error(`含有未填写的项：${key}`);
                    return;
                }
            }
        }

        this.props.onSubmit(formValue);
    };

    render() {
        const {columns} = this.props;

        return this.buildForm(columns);
    }
}

const WrapperForm = Form.create()(EditForm);

class MyEditTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        };
        this.rowCount = 1;
    }

    render() {
        const value = this.props.value !== undefined ? this.props.value : this.state.value;
        const onChange = this.props.onChange ? this.props.onChange : (value) => {
            console.log('rev values:', value);
            this.setState({value})
        };

        const {columns, rowClassName, scroll, colClassName, size} = this.props;
        const deleteActionCell = {
            title: '操作',
            dataIndex: '',
            isActionType: true,
            key: 'action_delete',
            className: colClassName,
            render: (text, record) => <Button size='small' type='dashed' onClick={() => {
                value && onChange(value.filter(item => item.key !== record.key));
            }}>删除</Button>
        };

        return (
            <Table
                bordered
                size={size}
                columns={columns.concat(deleteActionCell)}
                dataSource={value}
                pagination={false}
                rowClassName={rowClassName}
                scroll={scroll}
                footer={() => {
                    return <WrapperForm columns={columns} onSubmit={(formValue) => {
                        console.log(formValue);
                        formValue.key = 'row$key' + this.rowCount++;
                        onChange(value ? value.concat(formValue) : [formValue]);
                    }
                    }/>
                }}

            />
        )
    }
}

export default MyEditTable;