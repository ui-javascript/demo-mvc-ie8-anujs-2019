/**
 * @author 汤国栋 2018-06-13 17:07:47
 * @deprecated 上传
 */
import React, { Component, PropTypes } from 'react';
import Upload from 'rc-upload';
import JrButton from './JrButton';
import JrMessage from './JrMessage';
import './style/upload';

export default class JrUpload extends Component {
  static propTypes = {
    getUpload: PropTypes.func.isRequired, // 获取上传文件方法
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func, // 参数列表：data->接口返回参数，file->文件对象
    data: PropTypes.object, // 额外参数
  };

  static defaultProps = {
    onSuccess: null,
    data: {},
  };

  constructor(props, context) {
    super(props, context);

    const { data } = this.props;
    this.state = { data: data || {} };
  }

  componentDidMount = () => {
    // 初始化加载的时候将 upload 上传方法传递给父组件
    const { getUpload } = this.props;
    const { data } = this.state;
    getUpload(this.upload);
    data.token = localStorage.getItem('token');
  };

  // upload 组件的异步提交
  action = () =>
    new Promise(resolve => {
      this.actionResolve = resolve;
    });

  beforeUpload = file => {
    this.setState({ filename: file.name });
  };

  // 上传方法
  upload = () => {
    const { filename } = this.state;
    const { url } = this.props;
    if (filename) {
      this.actionResolve(url);
    } else {
      JrMessage.warn('请选择上传文件');
    }
  };

  onSuccess = data => {
    const { onSuccess } = this.props;
    onSuccess(typeof data === 'string' ? JSON.parse(data) : data);
  };

  onError = error => {
    JrMessage.error('上传失败');
    throw error;
  };

  render() {
    const { data, filename } = this.state;
    return (
      <div className="jerry-upload">
        <Upload
          name="file"
          action={this.action}
          beforeUpload={this.beforeUpload}
          onSuccess={this.onSuccess}
          onError={this.onError}
          data={data}
        >
          <JrButton>选择文件</JrButton>
        </Upload>
        <span className="jerry-upload-filename">{filename}</span>
      </div>
    );
  }
}
