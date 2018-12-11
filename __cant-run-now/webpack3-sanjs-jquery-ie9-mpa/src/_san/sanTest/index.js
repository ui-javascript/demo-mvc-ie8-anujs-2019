import san from 'san'
import './css/hello.scss'
import NP from 'number-precision'
import $ from 'jquery'
console.log($.support)

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


console.log(NP.strip(0.09999999999999998)); // = 0.1
console.log(NP.plus(0.1, 0.2));             // = 0.3, not 0.30000000000000004
console.log(NP.plus(2.3, 2.4));             // = 4.7, not 4.699999999999999
console.log(NP.minus(1.0, 0.9));            // = 0.1, not 0.09999999999999998
console.log(NP.times(3, 0.3));              // = 0.9, not 0.8999999999999999
console.log(NP.times(0.362, 100));          // = 36.2, not 36.199999999999996
console.log(NP.divide(1.21, 1.1));          // = 1.1, not 1.0999999999999999
console.log(NP.round(0.105, 2));            // = 0.11, not 0.1
