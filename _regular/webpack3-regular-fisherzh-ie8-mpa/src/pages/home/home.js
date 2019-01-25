import Regular from 'regularjs'
import 'babel-polyfill'
import './home.css'

var app = new Regular({
  template: '<div>home</div>',
  data: {
    name: 'zfx'
  }
})
app.$inject('#app')
if(module.hot) {
  // accept update of dependency
  module.hot.accept()
}
