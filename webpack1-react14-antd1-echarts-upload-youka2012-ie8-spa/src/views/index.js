import React from "react";
import {render} from "react-dom";
import App from "./app";
import "./index.less";
import {queryParams} from "../utils/regfns";



// 热更新??
if(module.hot){
    console.log('支持热更新 !!');
    module.hot.accept(()=>{
        render(<App/>, document.getElementById("app"));
    })
}

render(<App/>, document.getElementById("app"));
