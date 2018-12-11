/**
 * @author 汤国栋 2018-04-27 16:04:59
 * @deprecated 多选框组件
 */
import React from 'react';
import Checkbox from 'rc-checkbox';
import './style/checkbox';

const JrCheckbox = props => {
  const { children, ...other } = props;
  return (
    <label>
      <Checkbox {...other} />
      &nbsp;&nbsp;
      {children}
    </label>
  );
};

export default JrCheckbox;
