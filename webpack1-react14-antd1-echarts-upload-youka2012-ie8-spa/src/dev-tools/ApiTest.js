import React, {Component} from 'react';
import {Row, Col, Button, Input, Form, Radio, Icon, Card, Tabs, message,Modal} from 'antd'
import ParamEditor from './ParamEditor'
import myAxios from '../utils/myAxios'
import './ApiTest.css'

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            url: '',
            method: 'get',
            tabActiveKey:'1',
            loading:false,
            bodyDisabled:true,
        };
        this.bodyParams = false;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {url, method} = this.state;
        if (!url) {
            message.error('url为空');
            return;
        }
        let param = {};
        if(this.bodyParams){
            this.bodyParams.forEach(item=>{
                param[item.name]=item.value;
            })
        }
        this.setState({loading:true});
        const showRes = (res)=>{
            this.setState({loading:false});
            Modal.info({
                title:'请求结果',
                content:JSON.stringify(res),
                width:'90%'
            })
        };
        const showError = (error)=>{
            this.setState({loading:false});
            Modal.error({
                title:'请求结果',
                content:JSON.stringify(error),
                width:'90%'
            })
        };
        switch (method) {
            case 'get':
                myAxios.get(url).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            case 'delete':
                myAxios.delete(url).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            case 'post_json':
                myAxios.post(url,param).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            case 'put_json':
                myAxios.put(url,param).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            case 'put_form':
                param['__isFormType']=true;
                myAxios.put(url,param).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            case 'post_form':
                param['__isFormType']=true;
                myAxios.post(url,param).then(res=>{
                    showRes(res);
                }).catch(error=>{
                    showError(error);
                });
                break;
            default:
                break;
        }

    };

    switchExpand = () => {
        this.setState({
            expand: !this.state.expand
        })
    };

    onParamChange = (params) => {
        if (!params) {
            return;
        }
        const url = this.state.url;
        if (url && url.replace(' ', '') !== '') {
            let newUrl = url;
            let paramStr = '';

            if (url.indexOf('?') !== -1) {
                newUrl = url.split('?')[0];
            }
            params.forEach(item => {
                paramStr = paramStr + item.name + "=" + item.value + '&';
            });
            paramStr = paramStr ? '?' + paramStr.slice(0, paramStr.length - 1) : '';
            this.setState({url: newUrl + paramStr})
        }
    };
    onBodyChange = (params) => {
        this.bodyParams = params;
    };

    render() {
        const {url, method,tabActiveKey,loading,bodyDisabled} = this.state;
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 21},
        };

        if (this.state.expand) {
            return (
                <div className='api-test'>
                    <Card title='API接口调试板' extra={<Icon type='minus-circle-o' className='api-test-icon-close' onClick={this.switchExpand}/>}>
                        <Form horizontal form={this.props.form}>
                            <FormItem label='URL' key='url$key' {...formItemLayout}>
                                <Input value={url} onChange={(e) => {
                                    this.setState({
                                        url: e.target.value,
                                    })
                                }}/>
                            </FormItem>
                            <FormItem label='Method' key='method$key' {...formItemLayout}>
                                <RadioGroup value={method} onChange={(e) => {
                                    const newMethod = e.target.value;
                                    this.setState({
                                        method: newMethod,
                                        tabActiveKey: (newMethod === 'get' || newMethod === 'delete')?'1':'2',
                                        bodyDisabled:(newMethod === 'get' || newMethod === 'delete')?true:false,
                                    })
                                }}>
                                    <Radio value='get'>Get</Radio>
                                    <Radio value='delete'>Delete</Radio>
                                    <Radio value='post_json'>Post/Json</Radio>
                                    <Radio value='post_form'>Post/Form</Radio>
                                    <Radio value='put_json'>Put/Json</Radio>
                                    <Radio value='put_form'>Put/Form</Radio>
                                </RadioGroup>
                            </FormItem>
                            <Tabs activeKey={tabActiveKey} onChange={(v)=>{
                                this.setState({tabActiveKey:v})
                            }}>
                                <TabPane tab='Params' key='1'>
                                    <div style={{height: '400px', overFlowY: 'auto'}}>
                                        <ParamEditor onChange={this.onParamChange}/>
                                    </div>
                                </TabPane>
                                <TabPane tab='Body' key='2' disabled={bodyDisabled}>
                                    <div style={{height: '400px', overFlowY: 'auto'}}>
                                        <ParamEditor onChange={this.onBodyChange}/>
                                    </div>
                                </TabPane>
                            </Tabs>
                            <FormItem key='btn$key' wrapperCol={{span: 12}}>
                                <Button type='primary' loading={loading} onClick={this.onSubmit}>Send</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className='api-test-icon' onClick={this.switchExpand}>
                    <Icon type='eye-o'/>
                </div>
            )
        }
    }
}

export default MyComponent;