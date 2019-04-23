import Nerv from 'nervjs'

class CustomTextInput extends Nerv.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // 直接使用原生 API 使 text 输入框获得焦点
    this.textInput.focus();
  }

  render() {
    // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 Nerv 
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={(input) => {
            this.textInput = input;
          }}/>
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
