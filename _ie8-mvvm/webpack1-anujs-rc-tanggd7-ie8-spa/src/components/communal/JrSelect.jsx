/**
 * @author 汤国栋 2018-09-18 10:18:41
 * @deprecated 选择下拉框组件
 */
import React, { PropTypes } from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import './style/select';

const JrSelect = props => {
  const { defaultValue, style, onChange, options } = props;
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: '100%', style }}
      className="jerry-select"
      notFoundContent="无"
      optionFilterProp="children"
      optionLabelProp="children"
      onChange={e => {
        onChange(e && e.target ? e.target.value : e);
      }}
      dropdownMenuStyle={{ height: 200 }}
      allowClear
    >
      {options.map(current => (
        <Option key={current.value} value={current.value}>
          {current.text}
        </Option>
      ))}
    </Select>
  );
};

JrSelect.propTypes = {
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

JrSelect.defaultProps = {
  defaultValue: '',
  style: Object.create(null),
  onChange: () => {},
  options: [],
};

export default JrSelect;
