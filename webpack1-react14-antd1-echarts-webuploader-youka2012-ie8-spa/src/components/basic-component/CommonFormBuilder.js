import React, {Component} from 'react';
import myAxios from '../../utils/myAxios';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Button,
    message,
    Radio,
    Select,
    Cascader,
    Transfer,
    InputNumber,
    DatePicker,
    TimePicker,
    Spin,
    Modal,
    QueueAnim,
} from 'antd';
import MyTransfer from "./MacForm/MyTransfer";
import MyDatePicker from "./MacForm/MyDatePicker";
import MyInput from "./MacForm/MyInput";
import MyInputNumber from "./MacForm/MyInputNumber";
import MySelect from "./MacForm/MySelect";
import MyTimePicker from "./MacForm/MyTimePicker";
import MyCheckboxGroup from "./MacForm/MyCheckboxGroup";
import MyLinkingSelect from "./MacForm/MyLinkingSelect";
import MyCascader from "./MacForm/MyCascader";
import MyTreeSelect from "./MacForm/MyTreeSelect";
import MyRadioGroup from "./MacForm/MyRadioGroup";

const FormItem = Form.Item;

const withFormItem = (_option) => (MyComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                value: props.fullValueResult && _option.optionsDataFilter && props.defaultValue !== undefined ? _option.optionsDataFilter(props.defaultValue) : props.defaultValue,
                validateStatus: props.validateStatusFromProps,
                fullValueResult: props.fullValueResult,
                helpMessage: _option.message,
                required: _option.required,
                validator: _option.validator,
                optionsDataFilter: _option.optionsDataFilter,
                hidden: _option.hidden,
                key: _option.key,
                label: _option.label,
                itemLayout: _option.itemLayout,
            };
            console.log('withFormItem init', this.state);
            console.log('withFormItem props', props);
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.defaultValue === this.props.defaultValue && nextState.value === this.state.value && nextState.validateStatus === this.state.validateStatus) {
                return false;
            }
            return true;
        }

        onChange(value) {
            const {required, validator} = this.state;
            let validateStatus = 'success';
            if ((required && (value === '' || value === null || value === undefined || (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0))) || (validator && validator(value) === false)) {
                validateStatus = 'error';
            }
            this.setState({
                value,
                validateStatus
            });
            console.log('withFormItem onChange value', value, validateStatus);
        }

        render() {
            const {key, itemLayout, label, required, validateStatus, helpMessage, value, hidden, fullValueResult} = this.state;
            console.log('render state', this.state, helpMessage);
            if (!hidden) {
                return (
                    <FormItem
                        {...itemLayout} label={label} key={key}
                        required={required}
                        help={validateStatus === 'error' ? helpMessage : ''}
                        setValidateStatus={this.props.setValidateStatus}
                        validateStatus={!validateStatus ? this.props.settedValidateStatus : validateStatus}
                    >
                        <MyComponent fullValueResult={fullValueResult} {...this.props} value={value}
                                     onChange={this.onChange.bind(this)}/>
                    </FormItem>
                )
            } else {
                return <div style={{display: 'none'}}>
                    <MyComponent {...this.props} value={value}
                                 onChange={this.onChange.bind(this)}/>
                </div>
            }

        }
    }
};

class CommonForm extends Component {
    constructor(props) {
        super(props);
        const isEdit = props._options.type === 'edit';
        const isDataFromRouter = !!props._options.editDataFromRouter;
        /*if (isEdit && props.location.state === undefined) {
            props.history.goBack();
        }*/
        const stateValueFilter = props._options.stateValueFilter ? props._options.stateValueFilter : value => value;
        this.state = {
            loading: false,
            defaultValueCollection: isEdit && !isDataFromRouter && props.location.state ? stateValueFilter(props.location.state) : {},
            defaultValueCollectionBackup: isEdit && !isDataFromRouter && props.location.state ? stateValueFilter(props.location.state) : {},
            validateStatusCollection: {},
        };
        if (props._options.defaultValueTargetKey !== undefined) {
            this.targetDefaultValue = props.location.search ? props.location.search.slice(1) : null;
        }
        console.log('CommonForm props', props);
        console.log('CommonForm state', this.state);
    }

    componentWillMount() {
        const isEdit = this.props._options.type === 'edit';
        if (isEdit && !this.props._options.editDataFromRouter &&this.props.location.state === undefined) {
            this.props.history.goBack();
        }
    }

    componentDidMount() {
        //url/:id形式 即editDataFromRouter
        if (this.props._options.type !== 'edit' || !this.props._options.editDataFromRouter) {
            return
        }
        let defaultValueCollection = {};
        const {defaultValueUrl, stateValueFilter} = this.props._options;
        const id = this.props.match.params.id;
        const restfulParams = (id !== undefined && id !== '') ? '/' + id : null;
        if (defaultValueUrl && restfulParams) {
            // this.setState({loading: true,});
            myAxios.get(defaultValueUrl + restfulParams).then((data) => {
                if (stateValueFilter && typeof stateValueFilter === 'function') {
                    defaultValueCollection = stateValueFilter(data);
                } else {
                    defaultValueCollection = data;
                }
                this.setState({
                    loading: false,
                    defaultValueCollection,
                    defaultValueCollectionBackup: defaultValueCollection
                });
            }).catch(error => {
                this.setState({loading: false,});
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const _options = this.props._options;

        let valueCollection = {};
        let validateStatusCollection = {};
        let vFlag = true;
        _options.rows.forEach(row => {
            if (Object.prototype.toString.call(row) === '[object Array]') {
                row.map(item => {
                    const value = this.refs[item.key + '$item_key'].state.value;
                    valueCollection[item.key] = value;
                    if ((item.required && (value === '' || value === null || value === undefined || (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0))) || (item.validator && item.validator(value) === false)) {
                        this.refs[item.key + '$item_key'].state['validateStatus'] = 'error';
                        vFlag = false;
                        validateStatusCollection[item.key] = 'error';
                    }
                })
            } else {
                const value = this.refs[row.key + '$item_key'].state.value;
                valueCollection[row.key] = value;
                if ((row.required && (value === '' || value === null || value === undefined || (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0))) || (row.validator && row.validator(value) === false)) {
                    this.refs[row.key + '$item_key'].state['validateStatus'] = 'error';
                    vFlag = false;
                    validateStatusCollection[row.key] = 'error';
                }
            }
        });
        console.log('valueCollection', valueCollection);
        console.log('validateStatusCollection', validateStatusCollection);
        if (!vFlag) {
            this.setState({validateStatusCollection, defaultValueCollection: valueCollection});
            return;
        }

        valueCollection = _options.dataFilter && Object.prototype.toString.call(_options.dataFilter) === '[object Function]' ? _options.dataFilter(valueCollection) : valueCollection;
        console.log('new valueCollection', valueCollection);

        if (_options.onSubmit && Object.prototype.toString.call(_options.onSubmit) === '[object Function]') {
            _options.onSubmit(valueCollection, () => {
                const thisDefaultSubmit = this.defaultSubmit.bind(this);
                thisDefaultSubmit(valueCollection);
            });
        } else {
            this.defaultSubmit(valueCollection);
        }
    }

    defaultSubmit(values) {
        this.setState({loading: true});
        if (this.props._options.type === 'add') {
            myAxios.post(this.props._options.submitUrl, values)
                .then(response => {
                    Modal.info({title: '新建提交成功！'});
                    this.setState({loading: false});
                    this.props.onSubmitSuccess && this.props.onSubmitSuccess();
                    this.props.history.goBack();
                })
                .catch(error => {
                    this.setState({loading: false});
                    Modal.warning({title: '新建提交失败！'});
                })
        } else if (this.props._options.type === 'edit') {
            myAxios.put(this.props._options.submitUrl, values)
                .then(response => {
                    this.setState({loading: false});
                    Modal.info({title: '修改提交成功！'});
                    this.props.onSubmitSuccess && this.props.onSubmitSuccess();
                    this.props.history.goBack();
                })
                .catch(error => {
                    this.setState({loading: false});
                    Modal.warning({title: '修改提交失败！'});
                })
        } else {
            this.setState({loading: false});
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({validateStatusCollection: {}, defaultValueCollection: this.state.defaultValueCollectionBackup});
        /*this.props._options.rows.forEach(row => {
            if (Object.prototype.toString.call(row) === '[object Array]') {
                row.forEach(item => {
                    this.refs[item.key + '$item_key'].state.value = item.defaultValue;
                });
            } else {
                this.refs[row.key + '$item_key'].state.value = row.defaultValue;
            }
        });*/
    }

    render() {
        console.log('CFB***rendering***',this.state);
        // console.log(this.formBody);
        // console.log('------');
        const _options = this.props._options;
        const defaultValueCollection = this.state.defaultValueCollection;
        const validateStatusCollection = this.state.validateStatusCollection;

        const formItemLayout = _options.formItemLayout ? _options.formItemLayout : {
            labelCol: {span: 6},
            wrapperCol: {span: 12},
        };
        const buildItem = (row, inlineFormLayout) => {
            const itemLayout = inlineFormLayout ? inlineFormLayout : formItemLayout;
            let hasDefaultKey = false;
            if (_options.defaultValueTargetKey && row.key === _options.defaultValueTargetKey) {
                hasDefaultKey = true;
            }
            const itemOptions = {
                itemLayout,
                label: row.label,
                key: row.key,
                required: row.required,
                message: row.message,
                validator: row.validator,
                optionsDataFilter: row.optionsDataFilter,
                hidden: row.hidden,
                viewType: row.viewType,
            };
            switch (row.viewType) {
                case 'Select':
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentSelect = withFormItem(itemOptions)(MySelect);
                    return (
                        <MyComponentSelect selectOptions={row.selectOptions} optionsUrl={row.optionsUrl}
                                           ref={row.key + '$item_key'} key={row.key + '$item_key'}
                                           optionsQueryParams={row.optionsQueryParams}
                                           optionsDataFilter={row.optionsDataFilter}
                                           validateStatusFromProps={validateStatusCollection[row.key]}
                                           defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key]: row.defaultValue}
                        />
                    );
                    break;
                case 'MultipleSelect':
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentMultipleSelect = withFormItem(itemOptions)(MySelect);
                    return (

                        <MyComponentMultipleSelect selectOptions={row.selectOptions} multiple
                                                   optionsUrl={row.optionsUrl} ref={row.key + '$item_key'}
                                                   key={row.key + '$item_key'}
                                                   optionsQueryParams={row.optionsQueryParams}
                                                   optionsDataFilter={row.optionsDataFilter}
                                                   validateStatusFromProps={validateStatusCollection[row.key]}
                                                   defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'LinkingSelect':
                    if (!row.defaultValue) {
                        row.defaultValue = [];
                    }
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentLinkingSelect = withFormItem(itemOptions)(MyLinkingSelect);
                    return (

                        <MyComponentLinkingSelect selectOptions={row.selectOptions}
                                                  optionsUrl={row.optionsUrl} ref={row.key + '$item_key'}
                                                  key={row.key + '$item_key'}
                                                  optionsQueryParams={row.optionsQueryParams}
                                                  optionsDataFilter={row.optionsDataFilter}
                                                  size={row.size ? row.size : 'default'} style={row.style}
                                                  multiple={row.multiple} secondLabel={row.secondLabel}
                                                  validateStatusFromProps={validateStatusCollection[row.key]}
                                                  defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'TreeSelect':
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentTreeSelect = withFormItem(itemOptions)(MyTreeSelect);
                    return (
                        <MyComponentTreeSelect selectOptions={row.selectOptions} optionsUrl={row.optionsUrl}
                                               ref={row.key + '$item_key'} key={row.key + '$item_key'}
                                               optionsQueryParams={row.optionsQueryParams}
                                               optionsDataFilter={row.optionsDataFilter}
                                               validateStatusFromProps={validateStatusCollection[row.key]}
                                               defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}
                                               style={row.style} dropdownStyle={row.dropdownStyle}
                        />
                    );
                    break;
                case 'CheckboxGroup':
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentCheckboxGroup = withFormItem(itemOptions)(MyCheckboxGroup);
                    return (
                        <MyComponentCheckboxGroup selectOptions={row.selectOptions} ref={row.key + '$item_key'}
                                                  key={row.key + '$item_key'}
                                                  validateStatusFromProps={validateStatusCollection[row.key]}
                                                  defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'RadioGroup':
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentRadioGroup = withFormItem(itemOptions)(MyRadioGroup);
                    return (
                        <MyComponentRadioGroup selectOptions={row.selectOptions}
                                               validateStatusFromProps={validateStatusCollection[row.key]}
                                               defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}
                                               ref={row.key + '$item_key'} key={row.key + '$item_key'}
                        />
                    );
                    break;
                case 'Input':
                    if (!row.defaultValue) {
                        row.defaultValue = '';
                    }
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentInput = withFormItem(itemOptions)(MyInput);
                    return (
                        <MyComponentInput disabled={row.disabled} ref={row.key + '$item_key'}
                                          key={row.key + '$item_key'}
                                          validateStatusFromProps={validateStatusCollection[row.key]}
                                          defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}
                        />
                    );
                    break;
                case 'TextArea':
                    if (!row.defaultValue) {
                        row.defaultValue = '';
                    }
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentTextArea = withFormItem(itemOptions)(MyInput);
                    return (
                        <MyComponentTextArea validateStatusFromProps={validateStatusCollection[row.key]}
                                             defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}
                                             ref={row.key + '$item_key'}
                                             key={row.key + '$item_key'}
                                             type='textarea' rows={row.lines ? row.lines : 3}/>
                    );
                    break;
                case 'InputNumber':
                    if (!row.defaultValue) {
                        row.defaultValue = 0;
                    }
                    if (hasDefaultKey) {
                        row.defaultValue = Number(this.targetDefaultValue);
                    }
                    const MyComponentInputNumber = withFormItem(itemOptions)(MyInputNumber);
                    return (
                        <MyComponentInputNumber remainderProps={row.remainderProps} ref={row.key + '$item_key'}
                                                key={row.key + '$item_key'}
                                                validateStatusFromProps={validateStatusCollection[row.key]}
                                                defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'DatePicker':
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentDatePicker = withFormItem(itemOptions)(MyDatePicker);
                    return (
                        <MyComponentDatePicker remainderProps={row.remainderProps} ref={row.key + '$item_key'}
                                               key={row.key + '$item_key'}
                                               validateStatusFromProps={validateStatusCollection[row.key]}
                                               defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'TimePicker':
                    if (hasDefaultKey) {
                        row.defaultValue = this.targetDefaultValue;
                    }
                    const MyComponentTimePicker = withFormItem(itemOptions)(MyTimePicker);
                    return (
                        <MyComponentTimePicker remainderProps={row.remainderProps} ref={row.key + '$item_key'}
                                               key={row.key + '$item_key'}
                                               validateStatusFromProps={validateStatusCollection[row.key]}
                                               defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'Cascader':
                    if (!row.defaultValue) {
                        row.defaultValue = [];
                    }
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentCascader = withFormItem(itemOptions)(MyCascader);
                    return (
                        <MyComponentCascader selectOptions={row.selectOptions} size={row.size ? row.size : 'large'}
                                             ref={row.key + '$item_key'} key={row.key + '$item_key'}
                                             optionsUrl={row.optionsUrl} optionsQueryParams={row.optionsQueryParams}
                                             optionsDataFilter={row.optionsDataFilter}
                                             validateStatusFromProps={validateStatusCollection[row.key]}
                                             defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                case 'Transfer':
                    if (hasDefaultKey) {
                        row.defaultValue = [this.targetDefaultValue];
                    }
                    const MyComponentTransfer = withFormItem(itemOptions)(MyTransfer);
                    return (
                        <MyComponentTransfer id={row.key} selectOptions={row.selectOptions} ref={row.key + '$item_key'}
                                             key={row.key + '$item_key'} listStyle={row.listStyle}
                                             optionsUrl={row.optionsUrl} optionsQueryParams={row.optionsQueryParams}
                                             optionsDataFilter={row.optionsDataFilter}
                                             fullValueResult={row.fullValueResult}
                                             validateStatusFromProps={validateStatusCollection[row.key]}
                                             defaultValue={defaultValueCollection[row.key] !== undefined && defaultValueCollection[row.key] !== null ? defaultValueCollection[row.key] : row.defaultValue}/>
                    );
                    break;
                default:
                    break;
            }
        };
        const buildBody = (rows) => rows.map((row, index) => {
            if (Object.prototype.toString.call(row) === '[object Array]') {
                // row.map(item => buildItem(row));
                let colWidth = 24;
                switch (row.length) {
                    case 1:
                        colWidth = 24;
                        break;
                    case 2:
                        colWidth = 12;
                        break;
                    case 3:
                        colWidth = 8;
                        break;
                    case 4:
                        colWidth = 6;
                        break;
                    case 5:
                        colWidth = 4;
                        break;
                    case 6:
                        colWidth = 4;
                        break;
                    default:
                        colWidth = 24;
                        break;
                }
                const inlineFormLayout = _options.inlineFormLayout ? _options.inlineFormLayout : {
                    labelCol: {span: 10},
                    wrapperCol: {span: 14},
                };
                return (
                    <FormItem wrapperCol={{span: 24}} key={index + '$key'}>
                        {row.map(item => <Col span={colWidth + ''}
                                              key={item.key + '$col'}> {buildItem(item, inlineFormLayout)} </Col>)}
                    </FormItem>
                );
            } else {
                return buildItem(row);
            }
        });
        const formBody = (
            <Form horizontal>
                {buildBody(_options.rows)}
                <FormItem
                    wrapperCol={_options.buttonWrapperCol ? _options.buttonWrapperCol : {span: 8, offset: 10}}
                >
                    <div className='login-button'>
                        <Button type='primary'
                                onClick={this.handleSubmit.bind(this)}>提&nbsp;&nbsp;交</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type='text'
                                onClick={this.handleReset.bind(this)}>重&nbsp;&nbsp;置</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </FormItem>
            </Form>
        );

        const formLayout = _options.formLayout ? _options.formLayout : {span: '24', offset: '0'};
        return (
            <Spin spinning={this.state.loading}>
                <Row>
                    <Col {...formLayout}>
                        <div className='edit-box'>
                            {
                                _options.noHeader ?
                                    <Card>
                                        <div className='edit-card-content' style={{padding:'0 20%'}}>
                                            {formBody}
                                        </div>
                                    </Card> :
                                    <Card title={this.props._options.title}
                                          extra={<Button size='small' type='text'
                                                         onClick={() => {
                                                             this.props.history.replace(this.props.location.pathname.split('/').slice(0, 3).join('/'))
                                                         }
                                                         }>返回</Button>}>
                                        <div className='edit-card-content' style={{padding:'0 20%'}}>
                                            {formBody}
                                        </div>
                                    </Card>
                            }
                        </div>
                    </Col>
                </Row>
            </Spin>
        );
    }
}


/*
参数options模板：
{
    submitUrl:'',
    rows:[
        {
            key:'name',
            label:'姓名',
            viewType:'Input',//Select,MultipleSelect,CheckBox,Radio,Input,TextArea,InputNumber,DatePicker,DoubleDatePicker,TimePicker,Cascader,Transfer
            disabled:false,
            defaultValue:'',
            required:true,
            min:5,
            message:'请输入姓名',
            validator:function(rule,value,callback){

            },
            targetStateKey:'targetName',
        },
    ]
}
*/
const commonFormBuilder = (_options) => (props) => <CommonForm {...props} _options={_options}/>;

export default commonFormBuilder;

