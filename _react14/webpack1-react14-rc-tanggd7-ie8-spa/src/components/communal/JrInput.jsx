/**
 * @author 汤国栋 2018-04-27 16:04:37
 * @deprecated 输入框组件
 */
import React, { PropTypes } from 'react';
import './style/input';

const JrInput = ({ className, ...otherProps }) => (
  <input className={`jerry-input ${className}`} {...otherProps} />
);

JrInput.defaultProps = {
  className: '',
};

JrInput.propTypes = {
  className: PropTypes.string,
};

export default JrInput;
