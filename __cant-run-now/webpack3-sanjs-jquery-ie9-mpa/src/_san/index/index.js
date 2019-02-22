require('es5-polyfill')
// import "es5-polyfill"
// import "babel-profill"
// import 'babel-polyfill'

import san from 'san'

import {router} from 'san-router'
import HelloApp from './HelloApp.san';
import HelloApp2 from './HelloApp2.san';

console.log('hello webpack San');

// 这是控制路由，引入San组件  
// 不要问我怎么知道，看官方demo学来的。这个东西坑了我好久
router.add({rule: '/', Component: HelloApp, target: '#app'});
router.add({rule: '/san', Component: HelloApp2, target: '#app'});

// 一定要记得启动
router.start()
