/**
|--------------------------------------------------
| 跳转
|--------------------------------------------------
*/
import { browserHistory } from 'react-router';
import { PATH_PRE } from './constant';

const getUrl = (url, params) => {
  let Url = url;
  if (params) {
    let param = '';
    Object.keys(params).forEach(key => {
      param += `&${key}=${params[key].toString() || ''}`;
    });
    Url += `?${param && param.substring(1)}`;
  }
  return Url;
};

const redirect = (url = '', params = {}) => {
  window.location.href = getUrl(url, params);
};

const push = (url = '', state = {}) => {
  browserHistory.push({ pathname: `${PATH_PRE}${url}`, state });
};

export default { redirect, push };
