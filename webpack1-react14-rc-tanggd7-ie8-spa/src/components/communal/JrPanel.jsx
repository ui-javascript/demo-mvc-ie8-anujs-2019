/**
 * @author 汤国栋 2018-05-10 14:36:16
 * @deprecated 面板组件
 */
import React, { PropTypes } from 'react';
import './style/panel';

const JrPanel = props => {
  const { header, body } = props;
  const headerDom =
    !!header && (typeof header === 'string' ? header : header());
  const bodyDom = !!body && (typeof body === 'string' ? body : body());
  return (
    <div className="jerry-panel">
      <div className="jerry-panel-header">{headerDom}</div>
      <div className="jerry-panel-body">{bodyDom}</div>
    </div>
  );
};

JrPanel.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

JrPanel.defaultProps = {
  header: '',
  body: '',
};

export default JrPanel;
