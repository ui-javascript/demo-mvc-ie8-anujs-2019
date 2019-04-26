export default {
    type: 'ADD',
    title: '新增用户',
    primaryKey: 'id',
    submitUrl: './api/v1/sys/abc',
    rows: [
        {
            key: 'name',
            label: '姓名',
            viewType: 'Input',//Select,MultipleSelect,CheckBox,Radio,Input,TextArea,InputNumber,DatePicker,DoubleDatePicker,TimePicker,Cascader,Transfer
            disabled: false,
            defaultValue: '',
            selectOptions: [{value: '', label: ''}],//Select,MultipleSelect,CheckBox,Radio
            required: true,
            min: 5,
            message: '请输入姓名',
            validator: function (rule, value, callback) {

            },
            targetStateKey: 'targetName',
            dataPropsKey: ''
        },
    ]
};