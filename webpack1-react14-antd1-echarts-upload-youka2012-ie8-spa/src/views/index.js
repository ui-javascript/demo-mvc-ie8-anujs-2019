import React from "react";
import {render} from "react-dom";
import App from "./app";
import "./index.less";

if(module.hot){
    console.log('hot hot hot!!');
    module.hot.accept(()=>{
        render(<App/>, document.getElementById("app"));
    })
}

render(<App/>, document.getElementById("app"));