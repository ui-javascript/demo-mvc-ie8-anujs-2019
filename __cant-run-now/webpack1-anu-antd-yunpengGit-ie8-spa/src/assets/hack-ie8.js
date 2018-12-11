// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
    'use strict';
    global.console = global.console || {};
    var con = global.console;
    var prop, method;
    var empty = {};
    var dummy = function() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
        'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
    while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
})(typeof window === 'undefined' ? this : window);
// Using `this` for web workers while maintaining compatibility with browser
// targeted script loaders such as Browserify or Webpack where the only way to
// get to the global object is via `window`.

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.14/LICENSE
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){var e=Array;var t=e.prototype;var r=Object;var n=r.prototype;var i=Function.prototype;var a=String;var o=a.prototype;var l=Number;var u=l.prototype;var f=t.slice;var s=t.splice;var c=t.push;var v=t.unshift;var p=t.concat;var h=i.call;var g=Math.max;var y=Math.min;var d=n.toString;var w=typeof Symbol==="function"&&typeof Symbol.toStringTag==="symbol";var m;var b=Function.prototype.toString,T=function tryFunctionObject(e){try{b.call(e);return true}catch(t){return false}},x="[object Function]",O="[object GeneratorFunction]";m=function isCallable(e){if(typeof e!=="function"){return false}if(w){return T(e)}var t=d.call(e);return t===x||t===O};var S;var j=RegExp.prototype.exec,E=function tryRegexExec(e){try{j.call(e);return true}catch(t){return false}},I="[object RegExp]";S=function isRegex(e){if(typeof e!=="object"){return false}return w?E(e):d.call(e)===I};var D;var k=String.prototype.valueOf,U=function tryStringObject(e){try{k.call(e);return true}catch(t){return false}},N="[object String]";D=function isString(e){if(typeof e==="string"){return true}if(typeof e!=="object"){return false}return w?U(e):d.call(e)===N};var F=function(e){var t=r.defineProperty&&function(){try{var e={};r.defineProperty(e,"x",{enumerable:false,value:e});for(var t in e){return false}return e.x===e}catch(n){return false}}();var n;if(t){n=function(e,t,n,i){if(!i&&t in e){return}r.defineProperty(e,t,{configurable:true,enumerable:false,writable:true,value:n})}}else{n=function(e,t,r,n){if(!n&&t in e){return}e[t]=r}}return function defineProperties(t,r,i){for(var a in r){if(e.call(r,a)){n(t,a,r[a],i)}}}}(n.hasOwnProperty);var M=function isPrimitive(e){var t=typeof e;return e===null||t!=="object"&&t!=="function"};var R={ToInteger:function ToInteger(e){var t=+e;if(t!==t){t=0}else if(t!==0&&t!==1/0&&t!==-(1/0)){t=(t>0||-1)*Math.floor(Math.abs(t))}return t},ToPrimitive:function ToPrimitive(e){var t,r,n;if(M(e)){return e}r=e.valueOf;if(m(r)){t=r.call(e);if(M(t)){return t}}n=e.toString;if(m(n)){t=n.call(e);if(M(t)){return t}}throw new TypeError},ToObject:function(e){if(e==null){throw new TypeError("can't convert "+e+" to object")}return r(e)},ToUint32:function ToUint32(e){return e>>>0}};var A=function Empty(){};F(i,{bind:function bind(e){var t=this;if(!m(t)){throw new TypeError("Function.prototype.bind called on incompatible "+t)}var n=f.call(arguments,1);var i;var a=function(){if(this instanceof i){var a=t.apply(this,p.call(n,f.call(arguments)));if(r(a)===a){return a}return this}else{return t.apply(e,p.call(n,f.call(arguments)))}};var o=g(0,t.length-n.length);var l=[];for(var u=0;u<o;u++){c.call(l,"$"+u)}i=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this, arguments); }")(a);if(t.prototype){A.prototype=t.prototype;i.prototype=new A;A.prototype=null}return i}});var $=h.bind(n.hasOwnProperty);var C=h.bind(n.toString);var P=h.bind(o.slice);var Z=h.bind(o.split);var J=e.isArray||function isArray(e){return C(e)==="[object Array]"};var z=[].unshift(0)!==1;F(t,{unshift:function(){v.apply(this,arguments);return this.length}},z);F(e,{isArray:J});var B=r("a");var G=B[0]!=="a"||!(0 in B);var H=function properlyBoxed(e){var t=true;var r=true;if(e){e.call("foo",function(e,r,n){if(typeof n!=="object"){t=false}});e.call([1],function(){"use strict";r=typeof this==="string"},"x")}return!!e&&t&&r};F(t,{forEach:function forEach(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=-1;var i=R.ToUint32(r.length);var a;if(arguments.length>1){a=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.forEach callback must be a function")}while(++n<i){if(n in r){if(typeof a!=="undefined"){e.call(a,r[n],n,t)}else{e(r[n],n,t)}}}}},!H(t.forEach));F(t,{map:function map(t){var r=R.ToObject(this);var n=G&&D(this)?Z(this,""):r;var i=R.ToUint32(n.length);var a=e(i);var o;if(arguments.length>1){o=arguments[1]}if(!m(t)){throw new TypeError("Array.prototype.map callback must be a function")}for(var l=0;l<i;l++){if(l in n){if(typeof o!=="undefined"){a[l]=t.call(o,n[l],l,r)}else{a[l]=t(n[l],l,r)}}}return a}},!H(t.map));F(t,{filter:function filter(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=R.ToUint32(r.length);var i=[];var a;var o;if(arguments.length>1){o=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.filter callback must be a function")}for(var l=0;l<n;l++){if(l in r){a=r[l];if(typeof o==="undefined"?e(a,l,t):e.call(o,a,l,t)){c.call(i,a)}}}return i}},!H(t.filter));F(t,{every:function every(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=R.ToUint32(r.length);var i;if(arguments.length>1){i=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.every callback must be a function")}for(var a=0;a<n;a++){if(a in r&&!(typeof i==="undefined"?e(r[a],a,t):e.call(i,r[a],a,t))){return false}}return true}},!H(t.every));F(t,{some:function some(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=R.ToUint32(r.length);var i;if(arguments.length>1){i=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.some callback must be a function")}for(var a=0;a<n;a++){if(a in r&&(typeof i==="undefined"?e(r[a],a,t):e.call(i,r[a],a,t))){return true}}return false}},!H(t.some));var L=false;if(t.reduce){L=typeof t.reduce.call("es5",function(e,t,r,n){return n})==="object"}F(t,{reduce:function reduce(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=R.ToUint32(r.length);if(!m(e)){throw new TypeError("Array.prototype.reduce callback must be a function")}if(n===0&&arguments.length===1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var a;if(arguments.length>=2){a=arguments[1]}else{do{if(i in r){a=r[i++];break}if(++i>=n){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<n;i++){if(i in r){a=e(a,r[i],i,t)}}return a}},!L);var X=false;if(t.reduceRight){X=typeof t.reduceRight.call("es5",function(e,t,r,n){return n})==="object"}F(t,{reduceRight:function reduceRight(e){var t=R.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=R.ToUint32(r.length);if(!m(e)){throw new TypeError("Array.prototype.reduceRight callback must be a function")}if(n===0&&arguments.length===1){throw new TypeError("reduceRight of empty array with no initial value")}var i;var a=n-1;if(arguments.length>=2){i=arguments[1]}else{do{if(a in r){i=r[a--];break}if(--a<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(a<0){return i}do{if(a in r){i=e(i,r[a],a,t)}}while(a--);return i}},!X);var Y=t.indexOf&&[0,1].indexOf(1,2)!==-1;F(t,{indexOf:function indexOf(e){var t=G&&D(this)?Z(this,""):R.ToObject(this);var r=R.ToUint32(t.length);if(r===0){return-1}var n=0;if(arguments.length>1){n=R.ToInteger(arguments[1])}n=n>=0?n:g(0,r+n);for(;n<r;n++){if(n in t&&t[n]===e){return n}}return-1}},Y);var q=t.lastIndexOf&&[0,1].lastIndexOf(0,-3)!==-1;F(t,{lastIndexOf:function lastIndexOf(e){var t=G&&D(this)?Z(this,""):R.ToObject(this);var r=R.ToUint32(t.length);if(r===0){return-1}var n=r-1;if(arguments.length>1){n=y(n,R.ToInteger(arguments[1]))}n=n>=0?n:r-Math.abs(n);for(;n>=0;n--){if(n in t&&e===t[n]){return n}}return-1}},q);var K=function(){var e=[1,2];var t=e.splice();return e.length===2&&J(t)&&t.length===0}();F(t,{splice:function splice(e,t){if(arguments.length===0){return[]}else{return s.apply(this,arguments)}}},!K);var Q=function(){var e={};t.splice.call(e,0,0,1);return e.length===1}();F(t,{splice:function splice(e,t){if(arguments.length===0){return[]}var r=arguments;this.length=g(R.ToInteger(this.length),0);if(arguments.length>0&&typeof t!=="number"){r=f.call(arguments);if(r.length<2){c.call(r,this.length-e)}else{r[1]=R.ToInteger(t)}}return s.apply(this,r)}},!Q);var V=function(){var t=new e(1e5);t[8]="x";t.splice(1,1);return t.indexOf("x")===7}();var W=function(){var e=256;var t=[];t[e]="a";t.splice(e+1,0,"b");return t[e]==="a"}();F(t,{splice:function splice(e,t){var r=R.ToObject(this);var n=[];var i=R.ToUint32(r.length);var o=R.ToInteger(e);var l=o<0?g(i+o,0):y(o,i);var u=y(g(R.ToInteger(t),0),i-l);var s=0;var c;while(s<u){c=a(l+s);if($(r,c)){n[s]=r[c]}s+=1}var v=f.call(arguments,2);var p=v.length;var h;if(p<u){s=l;while(s<i-u){c=a(s+u);h=a(s+p);if($(r,c)){r[h]=r[c]}else{delete r[h]}s+=1}s=i;while(s>i-u+p){delete r[s-1];s-=1}}else if(p>u){s=i-u;while(s>l){c=a(s+u-1);h=a(s+p-1);if($(r,c)){r[h]=r[c]}else{delete r[h]}s-=1}}s=l;for(var d=0;d<v.length;++d){r[s]=v[d];s+=1}r.length=i-u+p;return n}},!V||!W);var _=!{toString:null}.propertyIsEnumerable("toString");var ee=function(){}.propertyIsEnumerable("prototype");var te=!$("x","0");var re=function(e){var t=e.constructor;return t&&t.prototype===e};var ne={$window:true,$console:true,$parent:true,$self:true,$frames:true,$frameElement:true,$webkitIndexedDB:true,$webkitStorageInfo:true};var ie=function(){if(typeof window==="undefined"){return false}for(var e in window){try{if(!ne["$"+e]&&$(window,e)&&window[e]!==null&&typeof window[e]==="object"){re(window[e])}}catch(t){return true}}return false}();var ae=function(e){if(typeof window==="undefined"||!ie){return re(e)}try{return re(e)}catch(t){return false}};var oe=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];var le=oe.length;var ue=function isArguments(e){return C(e)==="[object Arguments]"};var fe=function isArguments(e){return e!==null&&typeof e==="object"&&typeof e.length==="number"&&e.length>=0&&!J(e)&&m(e.callee)};var se=ue(arguments)?ue:fe;F(r,{keys:function keys(e){var t=m(e);var r=se(e);var n=e!==null&&typeof e==="object";var i=n&&D(e);if(!n&&!t&&!r){throw new TypeError("Object.keys called on a non-object")}var o=[];var l=ee&&t;if(i&&te||r){for(var u=0;u<e.length;++u){c.call(o,a(u))}}if(!r){for(var f in e){if(!(l&&f==="prototype")&&$(e,f)){c.call(o,a(f))}}}if(_){var s=ae(e);for(var v=0;v<le;v++){var p=oe[v];if(!(s&&p==="constructor")&&$(e,p)){c.call(o,p)}}}return o}});var ce=r.keys&&function(){return r.keys(arguments).length===2}(1,2);var ve=r.keys&&function(){var e=r.keys(arguments);return arguments.length!==1||e.length!==1||e[0]!==1}(1);var pe=r.keys;F(r,{keys:function keys(e){if(se(e)){return pe(f.call(e))}else{return pe(e)}}},!ce||ve);var he=-621987552e5;var ge="-000001";var ye=Date.prototype.toISOString&&new Date(he).toISOString().indexOf(ge)===-1;var de=Date.prototype.toISOString&&new Date(-1).toISOString()!=="1969-12-31T23:59:59.999Z";F(Date.prototype,{toISOString:function toISOString(){var e,t,r,n,i;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}n=this.getUTCFullYear();i=this.getUTCMonth();n+=Math.floor(i/12);i=(i%12+12)%12;e=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];n=(n<0?"-":n>9999?"+":"")+P("00000"+Math.abs(n),0<=n&&n<=9999?-4:-6);t=e.length;while(t--){r=e[t];if(r<10){e[t]="0"+r}}return n+"-"+f.call(e,0,2).join("-")+"T"+f.call(e,2).join(":")+"."+P("000"+this.getUTCMilliseconds(),-3)+"Z"}},ye||de);var we=function(){try{return Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(he).toJSON().indexOf(ge)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(e){return false}}();if(!we){Date.prototype.toJSON=function toJSON(e){var t=r(this);var n=R.ToPrimitive(t);if(typeof n==="number"&&!isFinite(n)){return null}var i=t.toISOString;if(!m(i)){throw new TypeError("toISOString property is not callable")}return i.call(t)}}var me=Date.parse("+033658-09-27T01:46:40.000Z")===1e15;var be=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"))||!isNaN(Date.parse("2012-12-31T23:59:60.000Z"));var Te=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(Te||be||!me){Date=function(e){var t=function Date(r,n,i,o,l,u,f){var s=arguments.length;var c;if(this instanceof e){c=s===1&&a(r)===r?new e(t.parse(r)):s>=7?new e(r,n,i,o,l,u,f):s>=6?new e(r,n,i,o,l,u):s>=5?new e(r,n,i,o,l):s>=4?new e(r,n,i,o):s>=3?new e(r,n,i):s>=2?new e(r,n):s>=1?new e(r):new e}else{c=e.apply(this,arguments)}if(!M(c)){F(c,{constructor:t},true)}return c};var r=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var n=[0,31,59,90,120,151,181,212,243,273,304,334,365];var i=function dayFromMonth(e,t){var r=t>1?1:0;return n[t]+Math.floor((e-1969+r)/4)-Math.floor((e-1901+r)/100)+Math.floor((e-1601+r)/400)+365*(e-1970)};var o=function toUTC(t){return l(new e(1970,0,1,0,0,0,t))};for(var u in e){if($(e,u)){t[u]=e[u]}}F(t,{now:e.now,UTC:e.UTC},true);t.prototype=e.prototype;F(t.prototype,{constructor:t},true);var f=function parse(t){var n=r.exec(t);if(n){var a=l(n[1]),u=l(n[2]||1)-1,f=l(n[3]||1)-1,s=l(n[4]||0),c=l(n[5]||0),v=l(n[6]||0),p=Math.floor(l(n[7]||0)*1e3),h=Boolean(n[4]&&!n[8]),g=n[9]==="-"?1:-1,y=l(n[10]||0),d=l(n[11]||0),w;var m=c>0||v>0||p>0;if(s<(m?24:25)&&c<60&&v<60&&p<1e3&&u>-1&&u<12&&y<24&&d<60&&f>-1&&f<i(a,u+1)-i(a,u)){w=((i(a,u)+f)*24+s+y*g)*60;w=((w+c+d*g)*60+v)*1e3+p;if(h){w=o(w)}if(-864e13<=w&&w<=864e13){return w}}return NaN}return e.parse.apply(this,arguments)};F(t,{parse:f});return t}(Date)}if(!Date.now){Date.now=function now(){return(new Date).getTime()}}var xe=u.toFixed&&(8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)!=="1"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128");var Oe={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function multiply(e,t){var r=-1;var n=t;while(++r<Oe.size){n+=e*Oe.data[r];Oe.data[r]=n%Oe.base;n=Math.floor(n/Oe.base)}},divide:function divide(e){var t=Oe.size,r=0;while(--t>=0){r+=Oe.data[t];Oe.data[t]=Math.floor(r/e);r=r%e*Oe.base}},numToString:function numToString(){var e=Oe.size;var t="";while(--e>=0){if(t!==""||e===0||Oe.data[e]!==0){var r=a(Oe.data[e]);if(t===""){t=r}else{t+=P("0000000",0,7-r.length)+r}}}return t},pow:function pow(e,t,r){return t===0?r:t%2===1?pow(e,t-1,r*e):pow(e*e,t/2,r)},log:function log(e){var t=0;var r=e;while(r>=4096){t+=12;r/=4096}while(r>=2){t+=1;r/=2}return t}};F(u,{toFixed:function toFixed(e){var t,r,n,i,o,u,f,s;t=l(e);t=t!==t?0:Math.floor(t);if(t<0||t>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}r=l(this);if(r!==r){return"NaN"}if(r<=-1e21||r>=1e21){return a(r)}n="";if(r<0){n="-";r=-r}i="0";if(r>1e-21){o=Oe.log(r*Oe.pow(2,69,1))-69;u=o<0?r*Oe.pow(2,-o,1):r/Oe.pow(2,o,1);u*=4503599627370496;o=52-o;if(o>0){Oe.multiply(0,u);f=t;while(f>=7){Oe.multiply(1e7,0);f-=7}Oe.multiply(Oe.pow(10,f,1),0);f=o-1;while(f>=23){Oe.divide(1<<23);f-=23}Oe.divide(1<<f);Oe.multiply(1,1);Oe.divide(2);i=Oe.numToString()}else{Oe.multiply(0,u);Oe.multiply(1<<-o,0);i=Oe.numToString()+P("0.00000000000000000000",2,2+t)}}if(t>0){s=i.length;if(s<=t){i=n+P("0.0000000000000000000",0,t-s+2)+i}else{i=n+P(i,0,s-t)+"."+P(i,s-t)}}else{i=n+i}return i}},xe);if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var e=typeof/()??/.exec("")[1]==="undefined";var t=Math.pow(2,32)-1;o.split=function(r,n){var i=this;if(typeof r==="undefined"&&n===0){return[]}if(!S(r)){return Z(this,r,n)}var a=[];var o=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.unicode?"u":"")+(r.sticky?"y":""),l=0,u,s,v,p;var h=new RegExp(r.source,o+"g");i+="";if(!e){u=new RegExp("^"+h.source+"$(?!\\s)",o)}var g=typeof n==="undefined"?t:R.ToUint32(n);s=h.exec(i);while(s){v=s.index+s[0].length;if(v>l){c.call(a,P(i,l,s.index));if(!e&&s.length>1){s[0].replace(u,function(){for(var e=1;e<arguments.length-2;e++){if(typeof arguments[e]==="undefined"){s[e]=void 0}}})}if(s.length>1&&s.index<i.length){c.apply(a,f.call(s,1))}p=s[0].length;l=v;if(a.length>=g){break}}if(h.lastIndex===s.index){h.lastIndex++}s=h.exec(i)}if(l===i.length){if(p||!h.test("")){c.call(a,"")}}else{c.call(a,P(i,l))}return a.length>g?P(a,0,g):a}})()}else if("0".split(void 0,0).length){o.split=function split(e,t){if(typeof e==="undefined"&&t===0){return[]}return Z(this,e,t)}}var Se=o.replace;var je=function(){var e=[];"x".replace(/x(.)?/g,function(t,r){c.call(e,r)});return e.length===1&&typeof e[0]==="undefined"}();if(!je){o.replace=function replace(e,t){var r=m(t);var n=S(e)&&/\)[*?]/.test(e.source);if(!r||!n){return Se.call(this,e,t)}else{var i=function(r){var n=arguments.length;var i=e.lastIndex;e.lastIndex=0;var a=e.exec(r)||[];e.lastIndex=i;c.call(a,arguments[n-2],arguments[n-1]);return t.apply(this,a)};return Se.call(this,e,i)}}}var Ee=o.substr;var Ie="".substr&&"0b".substr(-1)!=="b";F(o,{substr:function substr(e,t){var r=e;if(e<0){r=g(this.length+e,0)}return Ee.call(this,r,t)}},Ie);var De="	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";var ke="\u200b";var Ue="["+De+"]";var Ne=new RegExp("^"+Ue+Ue+"*");var Fe=new RegExp(Ue+Ue+"*$");var Me=o.trim&&(De.trim()||!ke.trim());F(o,{trim:function trim(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return a(this).replace(Ne,"").replace(Fe,"")}},Me);if(parseInt(De+"08")!==8||parseInt(De+"0x16")!==22){parseInt=function(e){var t=/^0[xX]/;return function parseInt(r,n){var i=a(r).trim();var o=l(n)||(t.test(i)?16:10);return e(i,o)}}(parseInt)}});
//# sourceMappingURL=es5-shim.map

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.14/LICENSE
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){var e=Function.prototype.call;var t=Object.prototype;var r=e.bind(t.hasOwnProperty);var n=e.bind(t.propertyIsEnumerable);var o=e.bind(t.toString);var i;var c;var f;var a;var l=r(t,"__defineGetter__");if(l){i=e.bind(t.__defineGetter__);c=e.bind(t.__defineSetter__);f=e.bind(t.__lookupGetter__);a=e.bind(t.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function getPrototypeOf(e){var r=e.__proto__;if(r||r===null){return r}else if(o(e.constructor)==="[object Function]"){return e.constructor.prototype}else if(!(e instanceof Object)){return null}else{return t}}}var u=function doesGetOwnPropertyDescriptorWork(e){try{e.sentinel=0;return Object.getOwnPropertyDescriptor(e,"sentinel").value===0}catch(t){return false}};if(Object.defineProperty){var p=u({});var s=typeof document==="undefined"||u(document.createElement("div"));if(!s||!p){var b=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||b){var O="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function getOwnPropertyDescriptor(e,o){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(O+e)}if(b){try{return b.call(Object,e,o)}catch(i){}}var c;if(!r(e,o)){return c}c={enumerable:n(e,o),configurable:true};if(l){var u=e.__proto__;var p=e!==t;if(p){e.__proto__=t}var s=f(e,o);var y=a(e,o);if(p){e.__proto__=u}if(s||y){if(s){c.get=s}if(y){c.set=y}return c}}c.value=e[o];c.writable=true;return c}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function getOwnPropertyNames(e){return Object.keys(e)}}if(!Object.create){var y;var d=!({__proto__:null}instanceof Object);var j=function shouldUseActiveX(){if(!document.domain){return false}try{return!!new ActiveXObject("htmlfile")}catch(e){return false}};var v=function getEmptyViaActiveX(){var e;var t;t=new ActiveXObject("htmlfile");t.write("<script></script>");t.close();e=t.parentWindow.Object.prototype;t=null;return e};var _=function getEmptyViaIFrame(){var e=document.createElement("iframe");var t=document.body||document.documentElement;var r;e.style.display="none";t.appendChild(e);e.src="javascript:";r=e.contentWindow.Object.prototype;t.removeChild(e);e=null;return r};if(d||typeof document==="undefined"){y=function(){return{__proto__:null}}}else{y=function(){var e=j()?v():_();delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;delete e.toString;delete e.valueOf;var t=function Empty(){};t.prototype=e;y=function(){return new t};return new t}}Object.create=function create(e,t){var r;var n=function Type(){};if(e===null){r=y()}else{if(typeof e!=="object"&&typeof e!=="function"){throw new TypeError("Object prototype may only be an Object or null")}n.prototype=e;r=new n;r.__proto__=e}if(t!==void 0){Object.defineProperties(r,t)}return r}}var w=function doesDefinePropertyWork(e){try{Object.defineProperty(e,"sentinel",{});return"sentinel"in e}catch(t){return false}};if(Object.defineProperty){var m=w({});var P=typeof document==="undefined"||w(document.createElement("div"));if(!m||!P){var E=Object.defineProperty,h=Object.defineProperties}}if(!Object.defineProperty||E){var g="Property description must be an object: ";var z="Object.defineProperty called on non-object: ";var T="getters & setters can not be defined on this javascript engine";Object.defineProperty=function defineProperty(e,r,n){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(z+e)}if(typeof n!=="object"&&typeof n!=="function"||n===null){throw new TypeError(g+n)}if(E){try{return E.call(Object,e,r,n)}catch(o){}}if("value"in n){if(l&&(f(e,r)||a(e,r))){var u=e.__proto__;e.__proto__=t;delete e[r];e[r]=n.value;e.__proto__=u}else{e[r]=n.value}}else{if(!l&&("get"in n||"set"in n)){throw new TypeError(T)}if("get"in n){i(e,r,n.get)}if("set"in n){c(e,r,n.set)}}return e}}if(!Object.defineProperties||h){Object.defineProperties=function defineProperties(e,t){if(h){try{return h.call(Object,e,t)}catch(r){}}Object.keys(t).forEach(function(r){if(r!=="__proto__"){Object.defineProperty(e,r,t[r])}});return e}}if(!Object.seal){Object.seal=function seal(e){if(Object(e)!==e){throw new TypeError("Object.seal can only be called on Objects.")}return e}}if(!Object.freeze){Object.freeze=function freeze(e){if(Object(e)!==e){throw new TypeError("Object.freeze can only be called on Objects.")}return e}}try{Object.freeze(function(){})}catch(x){Object.freeze=function(e){return function freeze(t){if(typeof t==="function"){return t}else{return e(t)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function preventExtensions(e){if(Object(e)!==e){throw new TypeError("Object.preventExtensions can only be called on Objects.")}return e}}if(!Object.isSealed){Object.isSealed=function isSealed(e){if(Object(e)!==e){throw new TypeError("Object.isSealed can only be called on Objects.")}return false}}if(!Object.isFrozen){Object.isFrozen=function isFrozen(e){if(Object(e)!==e){throw new TypeError("Object.isFrozen can only be called on Objects.")}return false}}if(!Object.isExtensible){Object.isExtensible=function isExtensible(e){if(Object(e)!==e){throw new TypeError("Object.isExtensible can only be called on Objects.")}var t="";while(r(e,t)){t+="?"}e[t]=true;var n=r(e,t);delete e[t];return n}}});
//# sourceMappingURL=es5-sham.map

/**
 * @preserve HTML5 Shiv 3.7.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 */
!function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=t.elements;return"string"==typeof a?a.split(" "):a}function e(a,b){var c=t.elements;"string"!=typeof c&&(c=c.join(" ")),"string"!=typeof a&&(a=a.join(" ")),t.elements=c+" "+a,j(b)}function f(a){var b=s[a[q]];return b||(b={},r++,a[q]=r,s[r]=b),b}function g(a,c,d){if(c||(c=b),l)return c.createElement(a);d||(d=f(c));var e;return e=d.cache[a]?d.cache[a].cloneNode():p.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!e.canHaveChildren||o.test(a)||e.tagUrn?e:d.frag.appendChild(e)}function h(a,c){if(a||(a=b),l)return a.createDocumentFragment();c=c||f(a);for(var e=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)e.createElement(h[g]);return e}function i(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return t.shivMethods?g(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-:]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(t,b.frag)}function j(a){a||(a=b);var d=f(a);return!t.shivCSS||k||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||i(a,d),a}var k,l,m="3.7.2",n=(a&&a.html5)||{},o=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,q="_html5shiv",r=0,s={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",k="hidden"in a,l=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){k=!0,l=!0}}();var t={elements:n.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:m,shivCSS:n.shivCSS!==!1,supportsUnknownElements:l,shivMethods:n.shivMethods!==!1,type:"default",shivDocument:j,createElement:g,createDocumentFragment:h,addElements:e};}(this,document);

/* MediaMatch v.2.0.2 - Testing css media queries in Javascript. Authors & copyright (c) 2013: WebLinc, David Knight. */

window.matchMedia||(window.matchMedia=function(c){var a=c.document,w=a.documentElement,l=[],t=0,x="",h={},G=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,H=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,y=0,A=function(b){var z=-1!==b.indexOf(",")&&b.split(",")||[b],e=z.length-1,j=e,g=null,d=null,c="",a=0,l=!1,m="",f="",g=null,d=0,f=null,k="",p="",q="",n="",r="",k=!1;if(""===
    b)return!0;do{g=z[j-e];l=!1;if(d=g.match(G))c=d[0],a=d.index;if(!d||-1===g.substring(0,a).indexOf("(")&&(a||!d[3]&&c!==d.input))k=!1;else{f=g;l="not"===d[1];a||(m=d[2],f=g.substring(c.length));k=m===x||"all"===m||""===m;g=-1!==f.indexOf(" and ")&&f.split(" and ")||[f];d=g.length-1;if(k&&0<=d&&""!==f){do{f=g[d].match(H);if(!f||!h[f[3]]){k=!1;break}k=f[2];n=p=f[5];q=f[7];r=h[f[3]];q&&(n="px"===q?Number(p):"em"===q||"rem"===q?16*p:f[8]?(p/f[8]).toFixed(2):"dppx"===q?96*p:"dpcm"===q?0.3937*p:Number(p));
        k="min-"===k&&n?r>=n:"max-"===k&&n?r<=n:n?r===n:!!r;if(!k)break}while(d--)}if(k)break}}while(e--);return l?!k:k},B=function(){var b=c.innerWidth||w.clientWidth,a=c.innerHeight||w.clientHeight,e=c.screen.width,j=c.screen.height,g=c.screen.colorDepth,d=c.devicePixelRatio;h.width=b;h.height=a;h["aspect-ratio"]=(b/a).toFixed(2);h["device-width"]=e;h["device-height"]=j;h["device-aspect-ratio"]=(e/j).toFixed(2);h.color=g;h["color-index"]=Math.pow(2,g);h.orientation=a>=b?"portrait":"landscape";h.resolution=
    d&&96*d||c.screen.deviceXDPI||96;h["device-pixel-ratio"]=d||1},C=function(){clearTimeout(y);y=setTimeout(function(){var b=null,a=t-1,e=a,j=!1;if(0<=a){B();do if(b=l[e-a])if((j=A(b.mql.media))&&!b.mql.matches||!j&&b.mql.matches)if(b.mql.matches=j,b.listeners)for(var j=0,g=b.listeners.length;j<g;j++)b.listeners[j]&&b.listeners[j].call(c,b.mql);while(a--)}},10)},D=a.getElementsByTagName("head")[0],a=a.createElement("style"),E=null,u="screen print speech projection handheld tv braille embossed tty".split(" "),
    m=0,I=u.length,s="#mediamatchjs { position: relative; z-index: 0; }",v="",F=c.addEventListener||(v="on")&&c.attachEvent;a.type="text/css";a.id="mediamatchjs";D.appendChild(a);for(E=c.getComputedStyle&&c.getComputedStyle(a)||a.currentStyle;m<I;m++)s+="@media "+u[m]+" { #mediamatchjs { position: relative; z-index: "+m+" } }";a.styleSheet?a.styleSheet.cssText=s:a.textContent=s;x=u[1*E.zIndex||0];D.removeChild(a);B();F(v+"resize",C);F(v+"orientationchange",C);return function(a){var c=t,e={matches:!1,
    media:a,addListener:function(a){l[c].listeners||(l[c].listeners=[]);a&&l[c].listeners.push(a)},removeListener:function(a){var b=l[c],d=0,e=0;if(b)for(e=b.listeners.length;d<e;d++)b.listeners[d]===a&&b.listeners.splice(d,1)}};if(""===a)return e.matches=!0,e;e.matches=A(a);t=l.push({mql:e,listeners:null});return e}}(window));