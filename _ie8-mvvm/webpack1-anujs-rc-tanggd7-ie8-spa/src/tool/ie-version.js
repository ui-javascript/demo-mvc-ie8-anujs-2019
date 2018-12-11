/**
|--------------------------------------------------
| 获取 IE 浏览器版本
|--------------------------------------------------
*/
export default () => {
  const { userAgent } = navigator; // 取得浏览器的 userAgent 字符串
  const isIE = userAgent.includes('compatible') && userAgent.includes('MSIE'); // 判断是否 IE 浏览器
  if (userAgent.includes('Edge') && !isIE) {
    return 'edge'; // 判断是否 IE 的 Edge 浏览器
  }
  if (userAgent.includes('Trident') && userAgent.includes('rv:11.0')) {
    return 11; // 判断是否 IE11 浏览器
  }
  if (isIE) {
    if (userAgent.includes('MSIE 6.0')) {
      return 6; // IE6
    }
    if (userAgent.includes('MSIE 7.0')) {
      return 7; // IE7
    }
    if (userAgent.includes('MSIE 8.0')) {
      return 8; // IE8
    }
    if (userAgent.includes('MSIE 9.0')) {
      return 9; // IE9
    }
    if (userAgent.includes('MSIE 10.0')) {
      return 10; // IE10
    }
  }
  return -1;
};
