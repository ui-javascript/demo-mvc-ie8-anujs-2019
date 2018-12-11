// import Nerv from 'nervjs'
// import Hello from '~/Nerv/Hello'
// import "./scripts/hello.ts"
//
// // import CustomTextInput from "@componentsNerv/form/CustomTextInput"
//
// // Nerv.render(<CustomTextInput />, document.getElementById('app'))
//
// class App extends Nerv.Component {
//   render() {
//     return <Hello/>;
//   }
// }
//
// Nerv.render(<App/>, document.querySelector('#app'));

import Nerv from 'nervjs';
import './styles/index.css';
import TodoBox from 'components/Nerv/todoList/todoBox/todoBox';

class App extends Nerv.Component {
  render() {
    return <TodoBox />;
  }
}

Nerv.render(<App />, document.querySelector('#app'));


