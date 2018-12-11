/**
 * @author 汤国栋 2018-09-18 11:29:39
 * @deprecated 询问框
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import iconInfo from 'static/icons/icon-info.png';
import iconSuccess from 'static/icons/icon-success.png';
import iconWarn from 'static/icons/icon-warn.png';
import iconError from 'static/icons/icon-error.png';
import iconHelp from 'static/icons/icon-help.png';
import JrButton from './JrButton';
import './style/confirm.less';

const preCls = 'jerry-modal';

class JrConfirm extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    afterClose: PropTypes.func,
    style: PropTypes.object,
    width: PropTypes.number,
    icon: PropTypes.node,
    hasCancel: PropTypes.bool,
  };

  static defaultProps = {
    title: '提示',
    content: '',
    onOk: null,
    onCancel: null,
    afterClose: null,
    style: {},
    width: 415,
    icon: iconHelp,
    hasCancel: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { visible: true };
  }

  destroyDialog(func) {
    if (func) {
      func();
    }
    // this.props.destroy();
    this.setState({ visible: false });
  }

  render() {
    const {
      title,
      content,
      onOk,
      onCancel,
      afterClose,
      style,
      width,
      icon,
      hasCancel,
    } = this.props;
    const { visible } = this.state;
    return (
      <Dialog
        zIndex="999"
        className={preCls}
        closable={false}
        visible={visible}
        width={width}
        style={style}
        animation="zoom"
        maskAnimation="fade"
        destroyOnClose
        afterClose={afterClose}
      >
        <div className={`${preCls}-wapper`}>
          <div className={`${preCls}-body`}>
            <img className={`${preCls}-icon`} src={icon} alt="" />
            <span className={`${preCls}-title`}>{title}</span>
            <div className={`${preCls}-content`}>{content}</div>
          </div>
          <div className={`${preCls}-btns`}>
            <JrButton type="primary" onClick={() => this.destroyDialog(onOk)}>
              确定
            </JrButton>
            {hasCancel && (
              <JrButton onClick={() => this.destroyDialog(onCancel)}>
                取消
              </JrButton>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

const createConfirm = config => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  // const destroy = () => {
  //   const unmountResult = ReactDOM.unmountComponentAtNode(div);
  //   if (unmountResult && div.parentNode) {
  //     div.parentNode.removeChild(div);
  //   }
  // };

  const render = props => {
    ReactDOM.render(<JrConfirm {...props} />, div);
  };
  render({ ...config });
};

const confirm = props => {
  createConfirm({
    icon: iconHelp,
    hasCancel: true,
    ...props,
  });
};

const info = props => {
  createConfirm({ icon: iconInfo, ...props });
};

const success = props => {
  createConfirm({ icon: iconSuccess, ...props });
};

const warn = props => {
  createConfirm({ icon: iconWarn, ...props });
};

const error = props => {
  createConfirm({ icon: iconError, ...props });
};

export default { confirm, info, success, warn, error };
