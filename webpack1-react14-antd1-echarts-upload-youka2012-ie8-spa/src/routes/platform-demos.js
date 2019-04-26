//antd-demos页
import {bundle} from "../components/common-tools/Bundle";
const Empty = props => <div><Spin/>Loading</div>;
const NoAu = props => <div><Spin/>页面加载失败...</div>;

import DemoSelect from "../components/business-components/antd-demos/components/DemoSelect";
const DemoSelectBundle = bundle(Empty, DemoSelect, {type: "callback"});

//platform-demos页
export const platform_demo_routes = [
    {type: "redirect", exact: true, strict: true, from: "/platform-demos", to: "/antd-demos/com-select"},
    // {type: "redirect", exact: true, strict: true, from: "/platform-demos", to: "/platform-demos/com-select"},
    {type: "route", path: "/platform-demos/com-select", component: DemoSelectBundle},
    {type: "route", component: NoAu},
];