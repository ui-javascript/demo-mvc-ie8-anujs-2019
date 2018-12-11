/**
 * @author 方磊 2018-09-18 10:39:30
 * @deprecated 富文本
 */
import React, { Component, PropTypes } from 'react';
import CKEditor from 'ui/CKEditor';
import './style/editor.less';

export default class JrEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func, // value：富文本值
    onBlur: PropTypes.func, // value：富文本值
    content: PropTypes.string, // 编辑器初始值
  };

  static defaultProps = {
    onChange: null,
    onBlur: null,
    content: null,
  };

  onChange = evt => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(evt.editor.getData());
    }
  };

  onBlur = evt => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(evt.editor.getData());
    }
  };

  render() {
    const { content } = this.props;
    return (
      <div>
        {content ? (
          <CKEditor
            scriptUrl="https://cdn.bootcss.com/ckeditor/4.9.2/ckeditor.js"
            // activeClass="p10"
            content={content}
            events={{
              change: this.onChange,
              blur: this.onBlur,
              // afterPaste: evt => this.afterPaste(evt),
            }}
            config={{
              removePlugins:
                'about,a11yhelp,specialchar,format,wsc,magicline,link,removeformat,stylescombo,filebrowser,floatingspace,scayt,indentlist,maximize,resize,list,tab,image,pastefromword,pastetext,horizontalrule,blockquote',
              extraPlugins: 'justify',
              removeButtons:
                'Copy,Cut,Paste,Indent,Outdent,Subscript,Superscript',
              height: '25em',
              allowedContent: true,
            }}
          />
        ) : null}
      </div>
    );
  }
}
