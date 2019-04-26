import React from "react";

const $$$ = {
    inArray: function (_item, _array) {
        return _array.indexOf(_item);
    }
};

const checkPermission = (userPermissions, needPermissions) => {
    if (!needPermissions) {
        return true;
    }
    if (typeof needPermissions === 'string') {
        needPermissions = needPermissions.split(';');
    }
    if (Object.prototype.toString.call(userPermissions) === '[object Array]') {
        for (let np in needPermissions) {
            if (!needPermissions[np]) continue;
            if ($$$.inArray(needPermissions[np], userPermissions)) {
                return true;
            } else {
                //验证是否*:*
                if ($$$.inArray('*:*', userPermissions.join(";")) !== -1) {
                    return true;
                } else {
                    //验证abc:*形式
                    if ($$$.inArray(':*', userPermissions.join(";")) !== -1) {
                        for (let upl in userPermissions) {
                            const upobj = userPermissions[upl];
                            if ($$$.inArray(":*", upobj) !== -1) {
                                if (upobj.split(":")[0] === needPermissions[np].split(":")[0]) {
                                    return true;
                                }
                            }
                        }
                    }
                    //验证*:abc形式
                    if ($$$.inArray('*:', userPermissions.join(";")) !== -1) {
                        for (let upl in userPermissions) {
                            const upobj = userPermissions[upl];
                            if ($$$.inArray("*:", upobj) !== -1) {
                                if (upobj.split(":")[1] === needPermissions[np].split(":")[1]) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
};

const PermissionCheck = (props) => {
    alert(Object.prototype.toString.call(props.children));
    // const userPermissions = window.__userPermissions ? window.__userPermissions : [];
    const ups = Cookies.get('__userPermissions');
    const userPermissions = ups ? ups : [];
    const needPermissions = props.needPermissions;
    if (userPermissions && checkPermission(userPermissions, needPermissions)) {
        return props.children;
    } else {
        return null;
    }
};

export const permissionCheck = (needPermissions) => (_component) => {
    if(!_component){
        return null;
    }
    if(!needPermissions){
        return _component;
    }
    const userPermissions = window.__userPermissions ? window.__userPermissions : [];
    if (userPermissions && checkPermission(userPermissions, needPermissions)) {
        return _component;
    } else {
        return null;
    }
};

export default PermissionCheck;