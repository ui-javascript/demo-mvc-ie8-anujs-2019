/**
 * @author 汤国栋 2018-04-27 16:04:18
 * @deprecated 按钮组件
 */
import React, { PropTypes } from 'react';
import './style/button';

const JrButton = props => {
  const { type, className, children, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`jerry-btn ${type && `jerry-btn-${type}`} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

JrButton.defaultProps = {
  type: '',
  className: '',
};

JrButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default JrButton;
