import React, {Component} from 'react';
import {RouteList} from "../../components/common-tools/Route";
import './Mainframe.css'

class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log('main frame init');
    }

    render() {
        return (
            <div className='main-frame-wrapper'>
                <RouteList routes={this.props.routes}></RouteList>
            </div>
        );
    }
}

export default MainFrame;