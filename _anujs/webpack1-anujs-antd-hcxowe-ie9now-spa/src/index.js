import React from 'react'
import ReactDOM from 'react-dom'
import 'create-react-class'
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

import './index.css'
import './antd.css'

import Login from './components/Login'
import Home from './components/Home'
import ButtonView from './components/ButtonView'
import IconView from './components/IconView'
import LayoutView from './components/LayoutView'
import CascaderView from './components/CascaderView'
import CheckBoxView from './components/CheckBoxView'
import DatePickerView from './components/DatePickerView'
import FormView from './components/FormView'
import InputView from './components/InputView'
import Views from './components/Views'
import TableView from './components/TableView'
import TreeView from './components/TreeView'
import NavView from './components/NavView'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/login" />
            <Route path="login" component={Login} />
            <Route path="home" component={Home} >
                <IndexRedirect to="/home/button" />
                <Route path="button" component={ButtonView} />
                <Route path="icon" component={IconView} />
                <Route path="layout" component={LayoutView} />
                <Route path="cascader" component={CascaderView} />
                <Route path="check" component={CheckBoxView} />
                <Route path="datepicker" component={DatePickerView} />
                <Route path="form" component={FormView} />
                <Route path="input" component={InputView} />
                <Route path="views" component={Views} />
                <Route path="table" component={TableView} />
                <Route path="tree" component={TreeView} />
                <Route path="nav" component={NavView} />
            </Route>
        </Route>
    </Router>, 
    document.getElementById("root")
)
