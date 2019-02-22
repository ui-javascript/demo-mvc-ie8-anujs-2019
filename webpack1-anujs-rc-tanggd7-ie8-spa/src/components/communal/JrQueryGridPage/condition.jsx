import React, { Component, PropTypes } from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';
import JrInput from '../JrInput';
import JrSelect from '../JrSelect';
import JrPanel from '../JrPanel';
import JrButton from '../JrButton';
import './index.less';

const format = 'YYYY-MM-DD'; // 查询列表日期组件格式化格式
const width = 200; // 查询列表表单宽度

class Condition extends Component {
  static propTypes = {
    conditions: PropTypes.array,
    advancedConditions: PropTypes.array,
    onSearchClick: PropTypes.func,
    onRefreshClick: PropTypes.func,
  };

  static defaultProps = {
    conditions: [],
    advancedConditions: [],
    onSearchClick: () => {},
    onRefreshClick: () => {},
  };

  constructor(props) {
    super(props);
    this.form = Object.create(null);
    this.state = { switchCondition: false };
  }

  // 获取表单值
  onChangeValue = e => {
    this.form[e.target.name] = e.target.value.trim();
  };

  // 生成表单组件
  renderForm = obj => {
    const { name, type, options = [], defaultValue, readonly } = obj;
    if (
      !!defaultValue &&
      !this.form[name] &&
      !Object.keys(this.form).includes(name)
    ) {
      this.form[name] = defaultValue;
    }
    if (type === 'input') {
      return (
        <JrInput
          style={{ width }}
          name={name}
          onChange={this.onChangeValue}
          defaultValue={defaultValue}
          readOnly={readonly}
        />
      );
    }
    if (type === 'select') {
      return (
        <JrSelect
          options={options}
          style={{ width }}
          onChange={value => {
            this.form[name] = value;
          }}
          defaultValue={defaultValue}
        />
      );
    }
    if (type === 'date') {
      return (
        <DatePicker
          animation="slide-up"
          calendar={<Calendar format={format} locale={zhCN} showDateInput />}
          onChange={value => {
            this.form[name] = (value && value.format(format)) || '';
          }}
        >
          {({ value }) => (
            <span>
              <JrInput
                readOnly
                style={{ width }}
                tabIndex="-1"
                value={(value && value.format(format)) || ''}
                defaultValue={defaultValue}
              />
            </span>
          )}
        </DatePicker>
      );
    }
    return null;
  };

  // 生成查询条件
  renderConditions = (conditions, isAdvanced) =>
    conditions.map((current, index, array) => {
      const pre = array[index - 1];
      const cls = Object.create(null);

      const { switchCondition } = this.state;
      if (isAdvanced && !switchCondition) {
        cls.display = 'none';
      }
      if ((index + 1) % 2 === 0) {
        const key = `condition-${index}`;
        return (
          <div key={key} className="jerry-qg-cd-cell" style={cls}>
            <span className="jerry-qg-cd-content-label">{pre.title}：</span>
            <span className="jerry-qg-cd-content-span">
              {this.renderForm(pre)}
            </span>
            <span className="jerry-qg-cd-content-label">{current.title}：</span>
            <span className="jerry-qg-cd-content-span">
              {this.renderForm(current)}
            </span>
          </div>
        );
      }
      if (
        array.length < 2 ||
        (index === array.length - 1 && (index + 1) % 2 > 0)
      ) {
        const key = `condition-${index}`;
        return (
          <div key={key} className="jerry-qg-cd-cell" style={cls}>
            <span className="jerry-qg-cd-content-label">{current.title}：</span>
            <span className="jerry-qg-cd-content-single">
              {this.renderForm(current)}
            </span>
          </div>
        );
      }
      return null;
    });

  // 普通查询条件
  createConditions = () => {
    const { conditions } = this.props;
    return this.renderConditions(conditions, false);
  };

  // 高级查询条件
  createAdvancedConditions = () => {
    const { advancedConditions } = this.props;
    return this.renderConditions(advancedConditions, true);
  };

  // 显示高级查询按钮事件
  switchCondition = () => {
    const { switchCondition } = this.state;
    this.setState({ switchCondition: !switchCondition });
  };

  search = () => {
    const { onSearchClick } = this.props;
    onSearchClick(this.form);
  };

  render() {
    const { onRefreshClick, advancedConditions } = this.props;
    const { switchCondition } = this.state;
    return (
      <div className="jerry-qg-cd">
        <JrPanel
          bodyStyle={{ padding: 0 }}
          header={() => (
            <span>
              搜索条件
              {advancedConditions.length > 0 && (
                <JrButton
                  onClick={() => {
                    this.switchCondition();
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {switchCondition ? '- ' : '+ '}
                  </span>
                  高级搜索
                </JrButton>
              )}
            </span>
          )}
          body={() => (
            <div className="jerry-qg-cd-content">
              {this.createConditions()}
              {this.createAdvancedConditions()}
              <div className="jerry-qg-cd-cell">
                <div className="jerry-qg-cd-search">
                  <JrButton
                    className="jerry-qg-cd-btn"
                    type="primary"
                    onClick={this.search}
                  >
                    查&nbsp;&nbsp;询
                  </JrButton>
                  <JrButton className="jerry-qg-cd-a" onClick={onRefreshClick}>
                    刷&nbsp;&nbsp;新
                  </JrButton>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default Condition;
