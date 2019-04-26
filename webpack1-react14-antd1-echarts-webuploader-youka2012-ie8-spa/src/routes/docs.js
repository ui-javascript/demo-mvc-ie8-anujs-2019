import {bundle} from "../components/common-tools/Bundle";
const Empty = props => <div><Spin/>Loading</div>;
const NoAu = props => <div><Spin/>页面加载失败...</div>;

import DemoSelect from "../components/business-components/antd-demos/components/DemoSelect";
const DemoSelectBundle = bundle(Empty, DemoSelect, {type: "callback"});

//doc页
export const doc_routes = [
    {type: "redirect", exact: true, strict: true, from: "/docs", to: "/docs/react-introduce"},
    {type: "route", path: "/docs/react-introduce", component: DocReactBundle},
    {type: "route", component: NoAu},
];