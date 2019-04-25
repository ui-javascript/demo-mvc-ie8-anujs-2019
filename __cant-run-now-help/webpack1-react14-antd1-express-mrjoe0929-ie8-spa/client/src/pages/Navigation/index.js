import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom';
import {RoutersConfig} from '../../routersConfig/index.js';

class Navigation extends Component {
    constructor(props){
        super(props); 
        this.state = {
            Links: () => RoutersConfig.map((val, key) => {
                // 导航
                return (
                    <Link key={key} to={val.to}>{val.context}</Link>
                )
            }),
            Router: () => RoutersConfig.map((val, key) => {
                // 路由内容
                return (
                    <Route key={key} path={val.path} component={val.component}/>
                )
            })
        }
    }
    render() {
        let Links = this.state.Links();
        let Router = this.state.Router();
        return (
            <div>
                <div>
                    {Links}
                    {Router}
                </div>
            </div>
        );
    }
}

export {Navigation};