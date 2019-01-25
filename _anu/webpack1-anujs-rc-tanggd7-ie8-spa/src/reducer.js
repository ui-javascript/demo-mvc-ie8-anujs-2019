/**
|--------------------------------------------------
| redux 所有 reducer 整合。
|--------------------------------------------------
*/
import { combineReducers } from 'redux';
import desktopReducer from './components/desktop/ducks';

export default combineReducers({ desktop: desktopReducer });
