/**
 * @author codeslayer1
 * @description CKEditor component to render a CKEditor textarea with defined configs and all CKEditor events handler
 */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import loadScript from 'load-script';

const defaultScriptUrl = 'http://cdn.bootcss.com/ckeditor/4.9.2/ckeditor.js';

class CKEditor extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    config: PropTypes.object,
    isScriptLoaded: PropTypes.bool,
    scriptUrl: PropTypes.string,
    activeClass: PropTypes.string,
    events: PropTypes.object,
  };

  static defaultProps = {
    content: '',
    config: {},
    isScriptLoaded: false,
    scriptUrl: defaultScriptUrl,
    activeClass: '',
    events: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isScriptLoaded: props.isScriptLoaded,
    };
  }

  componentDidMount = () => {
    const { isScriptLoaded } = this.state;
    const { scriptUrl } = this.props;
    if (!isScriptLoaded) {
      loadScript(scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  };

  componentWillReceiveProps = props => {
    const editor = this.editorInstance;
    if (editor && editor.getData() !== props.content) {
      editor.setData(props.content);
    }
  };

  componentWillUnmount = () => {
    this.unmounting = true;
  };

  onLoad = () => {
    if (this.unmounting) return;

    this.setState({
      isScriptLoaded: true,
    });

    if (!window.CKEDITOR) {
      return;
    }
    /*eslint-disable */
    this.editorInstance = window.CKEDITOR.appendTo(
      ReactDOM.findDOMNode(this),
      this.props.config,
      this.props.content
    );
    /* eslint-enable */
    // Register listener for custom events if any
    const { events } = this.props;
    Object.keys(events).forEach(key => {
      const eventHandler = events[key];
      this.editorInstance.on(key, eventHandler);
    });
  };

  render() {
    const { activeClass } = this.props;
    return <div className={activeClass} />;
  }
}

export default CKEditor;
