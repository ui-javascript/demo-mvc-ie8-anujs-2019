import React from "react";
import {Spin} from "antd";

import Home from "bundle-loader?lazy&name=home!../components/business-components/home/Home";

//demo页
import DemoPage from "bundle-loader?lazy&name=antd-demos!../components/business-components/antd-demos/DemoPage";


//doc页
import DocPage from "bundle-loader?lazy&name=docs!../components/business-components/docs/DocPage";


import {bundle} from "../components/common-tools/Bundle";

const Empty = props => <div><Spin/>Loading</div>;
const NoAu = props => <div><Spin/>页面加载失败...</div>;
const HomePageBundle = bundle(Empty, Home, {type: "callback"});

//demo页
const DemoPageBundle = bundle(Empty, DemoPage, {type: "callback"});

//doc页
const DocPageBundle = bundle(Empty, DocPage, {type: "callback"});

const routes = [
    { type: "redirect", exact: true, strict: true, from: "/", to: "/home" },
    // {type: "route", path: "/", exact: true, strict: true, component: HomePage},
    { type: "route", path: "/home", component: HomePageBundle },
    {type: "route", path: "/antd-demos", component: DemoPageBundle},
    {type: "route", path: "/echarts-demos", component: DemoPageBundle},
    {type: "route", path: "/webuploader-demos", component: DemoPageBundle},
    {type: "route", path: "/sockjs-demos", component: DemoPageBundle},
    {type: "route", path: "/platform-demos", component: DemoPageBundle},
    {type: "route", path: "/docs", component: DocPageBundle},
    {type: "route", component: NoAu},
];

export default routes;