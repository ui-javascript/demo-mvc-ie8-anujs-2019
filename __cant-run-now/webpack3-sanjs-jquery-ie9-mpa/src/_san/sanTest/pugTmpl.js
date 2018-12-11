import san from 'san'

// import "assets/less/config/index.js"
// import "assets/less/theme/zjds"
import './css/index.css'

const MyApp = san.defineComponent({
  template: `
                <div>
                    <input type="text" value="{=name=}">
                    <p class="hello">Hello {{name}}!</p>
                </div>
            `
});

// 挂载
let myApp = new MyApp({
  data: {
    name: 'San'
  }
});
myApp.attach(document.body);
