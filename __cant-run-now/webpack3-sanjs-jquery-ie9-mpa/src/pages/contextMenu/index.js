require('./css/custom.css')

// 引入图片 
// import img0 from './img/3d-material-drop-tool-icon.png'
import img1 from './img/Actions-draw-brush-icon.png'
import img2 from './img/Autodesk-Alias-Design-icon.png'
import img3 from './img/Design-Briefs-icon.png'

import class2context from "./js/class2context"

document.body.innerHTML += "<div id='contextMenus'></div>";

function function1() {
  alert("function 1 clicked");
}

function function2() {
  alert("function 2 clicked");
}

function function3() {
  alert("function 3 clicked");
}

function ContextMenus() {
  console.log("context menu called");
}


// var array = [
//   [`<img src=${img1} width='25px' /> A1`, `function1()`],
//   [`<img src=${img2} width='25px' /> A2`, `function2()`]
// ];
// class2context('class1', "titleA", array);
// class2context('class3', "titleC", [
//   [`<img src=${img1} width='25px' /> C1`, `function1()`],
//   [`<img src=${img3} width='25px' /> C3`, `function3()`]
// ]);
// class2context('class2', "titleB", [
//   [`<img src=${img2} width='25px' /> B2`, `function2()`],
//   [`<img src=${img3} width='25px' /> B3`, `function3()`]
// ]);
//
// class2context("classHeader", "titleTableMenu", [
//   ["header function 1", "function1()"],
//   ["header function 2", "function2()"]
// ]);
//
// class2context('class4', "title", [
//   ["option1", "function1()"],
//   ["option 2", "function2()"]
// ]);
// class2context('mainimg', "Image context menu", [
//   [`<img src=${img1} width='25px' /> C1`, "function1()"],
//   [`<img src=${img3} width='25px' /> C3`, "function3()"]
// ]);
//
// class2context('classSub2', "sub element context inside other element", [
//   [`<img src=${img1} width='25px' /> C1`, "function1()"],
// ]);
