import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'
// CSS Modules
// http://www.ruanyifeng.com/blog/2016/06/css_modules.html
import style from "assets/styles/test.css"

// 此图片现为路径
import img from 'assets/images/super.jpg'
import img1 from 'assets/images/password.png'
let imgSrc = '/' + img

imgSrc = img1

class Hello extends Nerv.Component {
  constructor() {
    super(...arguments)
    this.state = {
      message: 'nerv.js',
      img:  imgSrc
    }
  }

  render() {
    return (
      <div class={style.hello}>
        Hello, {this.state.message}

        <div>
          <img src={this.state.img} alt=""/>
        </div>

      </div>
    )
  }
}

export default Hello
