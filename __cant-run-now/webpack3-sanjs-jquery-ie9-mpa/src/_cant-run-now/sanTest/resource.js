// import img from "./img/super.jpg"
// import $ from "jquery"

// var imgSrc = './' + img
// console.log(imgSrc)
//
// let imgApp = (`
//     <div>
//         <img src="${imgSrc}" alt="hhhhh">
//     </div>
// `);
//
// $('body').append(imgApp)

import san from 'san'
// import "@less/natural-ui/index.less"
// import "@less/zjds-ui/_output.less"

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

