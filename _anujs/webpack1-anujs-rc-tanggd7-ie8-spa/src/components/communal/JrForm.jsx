/**
 * @author 方磊 2018-05-04
 * @deprecated 表单通用组件
 */
import moment from 'moment';
import 'moment/locale/zh-cn';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import DatePicker from 'rc-calendar/lib/Picker';
import cn from 'rc-calendar/lib/locale/zh_CN';
import Cascader from 'rc-cascader';
import 'rc-cascader/assets/index.css';
import 'rc-dialog/assets/index.css';
import { createForm } from 'rc-form';
import 'rc-notification/assets/index.css';
import React, { PropTypes } from 'react';
import { request, apiUrl } from 'tool';
import JrButton from './JrButton';
import JrMessage from './JrMessage';
import JrEditor from './JrEditor';
import './style/form.less';

const { SEND_VCODE } = apiUrl;
const format = 'YYYY-MM-DD';

class JrForm extends React.Component {
  static propTypes = {
    elements: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired, // 实现关闭dialog方法（visible改成false）
    reload: PropTypes.func,
    form: PropTypes.object.isRequired,
  };

  static defaultProps = {
    reload: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      // value: [],
      waitTime: '点击发送',
    };
  }

  // 短信模板选择
  onTmplSelect(v, target) {
    if (target) {
      // 查找短信内容字段
      const { elements, form } = this.props;
      elements.fieldSet.forEach(item => {
        const obj = item;
        // 如果有target，则取出对应content
        if (item.name === target) {
          if (
            v.toString() !== '0' &&
            v.toString() !== '99' &&
            item.dataSource
          ) {
            item.dataSource.forEach(i => {
              if (i.value === v) {
                obj.value = i.content;
                form.setFieldsValue({ [target]: i.content });
              }
            });
          } else if (v.toString() === '99') {
            obj.value = '';
            form.setFieldsValue({ [target]: '' });
          }
        }
      });
    }
  }

  // 赋值
  onCascaderChange = (value, name) => {
    const { form } = this.props;
    form.setFieldsValue({ [name]: value });
  };

  // 日期选择
  onDateChange = (value, name) => {
    const { form } = this.props;
    form.setFieldsValue({ [name]: value && value.format(format) });
  };

  // 联动选择
  onRelateSelect = (v, target) => {
    if (target) {
      // 二级联动
      const { elements } = this.props;
      elements.fieldSet.forEach(item => {
        // 如果有 target，则遍历 datasource 取出需要的数据放入 options。
        const obj = item;
        if (item.name === target) {
          obj.options = [{ value: '0', text: '请选择' }];
          if (v.toString() !== '0' && item.dataSource) {
            item.dataSource.forEach(i => {
              if (i.parentValue === v) {
                obj.options = [...item.options, ...[i]];
              }
            });
          }
          // 二级以后的联动，递归调用
          if (item.target) {
            this.onRelateSelect('0', item.target);
          }
        }
      });
    }
  };

  // 发送验证码
  onSend(target) {
    const { form } = this.props;
    const telephone = form.getFieldValue(target);
    if (telephone) {
      // 调用发送短信验证码接口
      request(SEND_VCODE(), { telephone }, 'get').then(({ entity }) => {
        this.setState({
          waitTime: entity.waitTime,
        });
        this.countdown();
      });
    } else if (!/^[1][0-9]{10}$/.test(telephone)) {
      JrMessage.error('请先输入正确手机号。');
    }
  }

  // 渲染表单元素
  renderElements = item => {
    let html;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { waitTime } = this.state;
    // max判断会自动判断是否是string类型，所以分开
    if (item.limit) {
      this.requiredDecorator = getFieldDecorator(item.name, {
        rules: [
          {
            required: item.required || false,
            message: item.message ? item.message : `${item.label}必填`,
            max: item.limit ? item.limit : null,
          },
        ],
        initialValue: item.value,
      });
    } else {
      this.requiredDecorator = getFieldDecorator(item.name, {
        rules: [
          {
            required: item.required || false,
            message: item.message ? item.message : `${item.label}必填`,
          },
        ],
        initialValue: item.value,
      });
    }

    switch (item.type) {
      // 文本框
      case 'text':
        html = (
          <span>
            {this.requiredDecorator(
              <input
                readOnly={item.readonly || false}
                style={{ width: item.width ? item.width : null }}
                type={item.rule ? item.rule : 'text'}
                min={item.min ? item.min : 'null'}
                max={item.max ? item.max : 'null'}
              />
            )}
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      case 'password':
        html = <span>{this.requiredDecorator(<input type="password" />)}</span>;
        break;
      case 'password_confirm':
        html = (
          <span>
            {this.requiredDecorator(
              <input
                type="password"
                onBlur={e =>
                  this.conformPassword(e.target.value, item.name, item.target)
                }
              />
            )}
          </span>
        );
        break;
      // select选框
      case 'select':
        html = (
          <span>
            {this.requiredDecorator(
              <select
                onChange={e => this.onRelateSelect(e.target.value, item.target)}
              >
                {item.options.map((i, k) => {
                  const key = k;
                  return (
                    <option key={key} value={i.value}>
                      {i.text}
                    </option>
                  );
                })}
              </select>
            )}
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      // 长文本框
      case 'textarea':
        html = (
          <span>{this.requiredDecorator(<textarea rows="5" cols="40" />)}</span>
        );
        break;
      // 日期选框
      case 'date':
        html = (
          <span>
            {this.requiredDecorator(<input type="hidden" />)}
            <DatePicker
              animation="slide-up"
              calendar={<Calendar format={format} locale={cn} showDateInput />}
              Value={moment(item.value)}
              onChange={value => this.onDateChange(value, item.name)}
            >
              {({ value }) => (
                <span>
                  <input
                    readOnly
                    tabIndex="-1"
                    value={(value && value.format(format)) || item.value}
                  />
                </span>
              )}
            </DatePicker>
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      // 纯文本
      case 'plaintext':
        html = <span>{item.text}</span>;
        break;
      // 联动选择器
      case 'cascader':
        html = (
          <span>
            <Cascader
              options={item.options}
              onChange={value => this.onCascaderChange(value, item.name)}
            >
              {this.requiredDecorator(<input />)}
            </Cascader>
            {item.required ? <span style={{ color: 'red' }}> *</span> : null}
          </span>
        );
        break;
      // 发送短信验证码
      case 'vcode':
        html = (
          <span>
            {this.requiredDecorator(<input />)}
            <JrButton
              type="info"
              className="send_code"
              onClick={() => this.onSend(item.target)}
              disabled={Number.isInteger(waitTime) ? 'disabled' : ''}
            >
              {waitTime}
            </JrButton>
          </span>
        );
        break;
      // 短信模板选择
      case 'sms_tmpl_select':
        html = (
          <span>
            {this.requiredDecorator(
              <select
                onChange={e => this.onTmplSelect(e.target.value, item.target)}
              >
                {item.options.map((i, k) => {
                  const key = k;
                  return (
                    <option key={key} value={i.value}>
                      {i.text}
                    </option>
                  );
                })}
              </select>
            )}
          </span>
        );
        break;
      case 'editor':
        html = (
          <span>
            {this.requiredDecorator(<input type="hidden" />)}
            <JrEditor
              onChange={value => this.onCascaderChange(value, item.name)}
              content={item.value}
            />
          </span>
        );
        break;
      default:
        break;
    }
    return html;
  };

  // 表单提交
  submit = () => {
    const { form, elements, close, reload } = this.props;
    form.validateFields((error, value) => {
      const { api, method } = elements;
      if (!error) {
        request(api, value, method || 'post').then(() => {
          close();
          reload();
        });
      }
    });
  };

  getError = name => {
    const { form } = this.props;
    const errors = form.getFieldError(name);
    return errors ? errors.join(',') : null;
  };

  // 发送验证码倒计时
  countdown() {
    const t = setInterval(() => {
      const { waitTime } = this.state;
      if (waitTime > 0) {
        this.setState({
          waitTime: waitTime - 1,
        });
      } else {
        this.setState({
          waitTime: '再次获取',
        });
        clearInterval(t);
      }
    }, 1000);
  }

  // 密码确认
  conformPassword(value, fieldname, target) {
    if (value) {
      const { form } = this.props;
      const passwordNew = form.getFieldValue(target);
      if (passwordNew !== value) {
        form.setFields({
          [fieldname]: { errors: ['密码不一致，请重新输入'] },
        });
      }
    }
  }

  render() {
    const { close, elements } = this.props;
    const { fieldSet } = elements;
    return (
      <div className="form_container">
        {fieldSet.map((item, k) => {
          if (item.type !== 'hidden') {
            const key = k;
            return (
              <div key={key} className="JrTable">
                <span className="table-label">{item.label}</span>
                <span className="table-span">
                  {this.renderElements(item)}
                  <b>{this.getError(item.name)}</b>
                </span>
              </div>
            );
          }
          return this.renderElements(item);
        })}
        <div className="rc-dialog-footer">
          <div className="jerry-dialog-footer">
            <JrButton onClick={this.submit} type="primary">
              确定
            </JrButton>
            <JrButton type="button" onClick={close}>
              取消
            </JrButton>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(JrForm);
