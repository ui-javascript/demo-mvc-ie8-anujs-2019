import React from "react";
import {Spin} from "antd";

import Home from "bundle-loader?lazy&name=home!../components/business-components/home/Home";

//demo页
import DemoPage from "bundle-loader?lazy&name=antd-demos!../components/business-components/antd-demos/DemoPage";
import DemoSelect from "bundle-loader?lazy&name=demo-select!../components/business-components/antd-demos/components/DemoSelect";


//doc页
import DocPage from "bundle-loader?lazy&name=docs!../components/business-components/docs/DocPage";
import DocReact from "bundle-loader?lazy&name=doc-react!../components/business-components/docs/react/DocReact";


import {bundle} from "../components/common-tools/Bundle";

const Empty = props => <div><Spin/>Loading</div>;
const NoAu = props => <div><Spin/>页面加载失败...</div>;
const HomePageBundle = bundle(Empty, Home, {type: "callback"});

//demo页
const DemoPageBundle = bundle(Empty, DemoPage, {type: "callback"});
const DemoSelectBundle = bundle(Empty, DemoSelect, {type: "callback"});

//doc页
const DocPageBundle = bundle(Empty, DocPage, {type: "callback"});
const DocReactBundle = bundle(Empty, DocReact, {type: "callback"});

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

//antd-demos页
export const antd_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/antd-demos", to: "/antd-demos/com-select"},
    {type: "route", path: "/antd-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];
//echarts-demos页
export const echarts_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/echarts-demos", to: "/antd-demos/com-select"},
    // {type: "redirect", exact: true, strict: true, from: "/echarts-demos", to: "/echarts-demos/com-select"},
    {type: "route", path: "/echarts-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];
//webuploader-demos页
export const webuploader_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/webuploader-demos", to: "/antd-demos/com-select"},
    // {type: "redirect", exact: true, strict: true, from: "/webuploader-demos", to: "/webuploader-demos/com-select"},
    {type: "route", path: "/webuploader-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];
//sockjs-demos页
export const sockjs_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/sockjs-demos", to: "/antd-demos/com-select"},
    {type: "route", path: "/sockjs-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];
//platform-demos页
export const platform_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/platform-demos", to: "/antd-demos/com-select"},
    // {type: "redirect", exact: true, strict: true, from: "/platform-demos", to: "/platform-demos/com-select"},
    {type: "route", path: "/platform-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];
//doc页
export const doc_routes = [
    {type: "redirect", exact: true, strict: true, from: "/docs", to: "/docs/react-introduce"},
    {type: "route", path: "/docs/react-introduce", component: DocReactBundle},
    {type: "route", component: NoAu},
];

export default routes;