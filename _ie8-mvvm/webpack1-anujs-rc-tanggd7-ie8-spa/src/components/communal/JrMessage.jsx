import React from 'react';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import iconInfo from 'static/icons/icon-info.png';
import iconSuccess from 'static/icons/icon-success.png';
import iconWarn from 'static/icons/icon-warn.png';
import iconError from 'static/icons/icon-error.png';
import './style/message';

let notification = null;
if (!notification) {
  Notification.newInstance({ prefixCls: 'jerry-message', style: {} }, n => {
    notification = n;
  });
}

const notice = (content, onClose, icon, duration = 2) => {
  notification.notice({
    content: (
      <span>
        <img src={icon} alt="" />
        <span>{content}</span>
      </span>
    ),
    onClose,
    duration,
  });
};

const info = (content, onClose, duration) => {
  notice(content, onClose, iconInfo, duration);
};

const success = (content, onClose, duration) => {
  notice(content, onClose, iconSuccess, duration);
};

const warn = (content, onClose, duration) => {
  notice(content, onClose, iconWarn, duration);
};

const error = (content, onClose, duration) => {
  notice(content, onClose, iconError, duration);
};

export default { info, success, warn, error };
