/**
 * @return boolean
 */
export function isIE8(): boolean {
  const nav: string = navigator.userAgent;
  if (isIE(nav)) {
    return nav.indexOf("MSIE 8.0") > 0 || (nav.indexOf("MSIE 9.0") > 0 && !window.innerWidth);
  } else {
    return false;
  }
}

export function isIE(nav: string) {
  return nav.indexOf("MSIE") > 0;
}
