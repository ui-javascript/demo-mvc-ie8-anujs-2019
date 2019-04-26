import React from "react";

const Icon = ({ type, className, ...res }) => {
    let cls = className || "";
    cls += /^\s+/.test(type) ? type
        : " anticon anticon-" + type;
    return <i className={cls} {...res} />;
};
export default  Icon;