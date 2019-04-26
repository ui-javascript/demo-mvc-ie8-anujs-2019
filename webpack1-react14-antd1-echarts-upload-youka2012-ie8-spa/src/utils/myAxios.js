import axios from 'axios';
import Qs from 'qs';
import Cookies from 'js-cookie';
import { Modal } from 'antd';

const myAxios = axios.create({
    // 若地址带有子路径，需要配置此项，否则网址后面加/，以便寻找正确的相对目录'./'，如sdafs.cn/qqaa/
    // baseURL:'/peas',
    timeout: 10000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    // headers: {'Content-Type': 'application/json;charset=utf-8'},
    // headers: {'Content-Type': 'application/x-www-form-urlencode;charset=utf-8'},
});

myAxios.interceptors.request.use(config => {
    // console.log('******before config***', config);
    const token = Cookies.get("CSRFToken");
    Cookies.set("CSRFDefense", token);
    if (config.method === 'post' || config.method === 'put') {
        // 后台接受的参数Content-Type
        // 默认 application/x-www-form-urlencode;charset=utf-8,
        //     --> 对应spring注解：@RequestParam, 用字段__isFormType标明
        // application/json;
        //     --> 对应spring注解：@RequestBody
        if (config.data['__isFormType']) {
            config.data = Qs.stringify({...config.data});
        } else {
            config.data = JSON.stringify(config.data);
            config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }

    // console.log('******axios config***', config);
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


myAxios.interceptors.response.use(response => {
    // console.log('******axios response***', response);
    const status = response.status;
    // 304 权限问题也正常返回，前端处理
    if ((status >= 200 && status < 300) || status === 304) {
        return response.data;
    }
}, error => {
    // console.log('------axios error---',error);
    const status = error.response.status;
    const message = error.response.data ? error.response.data : '网络错误，请刷新重试';
    const isAuth = Cookies.get('_isAuthorised');
    if (status && (status === 401 || status === 504)) {
        const hash = window.location.hash;
        if (hash && hash.indexOf('#/login') > -1) {

        } else {
            isAuth && Modal.warning({title: '提示', content: message});
            window.location.replace('#/login');
        }
    } else if (status && (status === 307)) {
        Modal.warning({title: '提示', content: message});
        window.location.replace('#/password-change');
    } else if (status && (status >= 500)) {
        // window.location.replace("#/error");
        // Modal.error({title: '错误提示', content: message + ':' + status});
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error.response.data);
    }
});

export default myAxios;
