import React, { Component } from 'react';
import axios from 'axios';

// 子组件
import {Tables} from 'components/Tables/index.js';
import images2 from 'static/img/brickpsert.png';
class CustomerManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/data`).then(res => {
            // const posts = res.data.data.children.map(obj => obj.data);
            console.log(res);
            this.setState({
                data: res.data.data.data.list
            });
        }).catch(res => {
            console.error(res); 
        })
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    render() {
        let d = this.state.data;
        return (
            <div>
                客户管理
                <Tables data={d}/>
            </div>
        );
    }

}

export {CustomerManagement};