import React from "react";
import {Router,Switch,Route} from "react-router-dom";
import {notification} from 'antd';

import history from "../utils/history";
import Main from "./main";
import Login from "../components/login/Login";
import PasswordChange from "../components/password-change/PasswordChange";

console.log('app');

const App = () =>
    <Router history={history}>
        <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/password-change' exact component={PasswordChange}></Route>
            <Route path='/' component={Main}></Route>
        </Switch>
    </Router>;

export default App;