# San FrameWork(Like Vue) With BootStrap3 by Webpack2 for IE8+


## 重要

<b>由于webpack不支持低版本IE下启动服务实时测试，必须通过打包才知道测试结果。</b> </br>
所以请用户自行在其他浏览器编写测试，最后回跑测试打包的IE</br>
代码压缩导致无法兼容低版本IE,故取消代码压缩功能。</br>
如有使用如Jquery第三方库的同学，最好自行引用它的min版本，而不是通过打包形式。（否则：反而使包变大）</br>
本项目只是为用户提供使用ES6新特性的可能，和简单方便的管理资源。其他扩展功能不在本项目的范围内。</br>

本次使用百度的MVVM框架  SamFrameWork 作为 VueJS 的替代品,编码方式及使用方法基本上与 Vue 类似 <br>
熟悉Vue2.0的同学可以很好的上手这款框架

<b>为了兼容 IE8,我们需要放弃 ES6的 export 和  import 语法,使用es5中的module.exports 和 require 语法</b>

<b>该项目使用BootStrap3.3.7作为前端的响应式框架,可以很好地在IE8上提供响应式的网站实现</b>
## 目录简介
1. [介绍](#介绍) 
2. [程序目录](#程序目录)
3. [项目启动](#项目启动)
    * [环境配置](#环境配置)
    * [依赖配置](#依赖配置)
    * [命令说明](#命令说明)
4. [使用手册](#使用手册)
    * [发布](#发布)  
5. [常见问题](/docs/Issue.md)
6. [更新日志](#更新日志)
7. [最重要的事情](#最重要的事情)

## 介绍
这个一个以webpack2为基础，启用tree-shaking新技术,为打包支持到低版本的`webpack2`实验性脚手架。</br>
本项目使用[`sanFrameWork`](https://baidu.github.io/san/)作为演示框架。</br>

### 关于【Webpack】
1. 服务端使用Express。需要注意的是，只有一个目的那就是提供了`webpack-dev-middleware` 和 `webpack-hot-middleware`（代码热替换）。使用自定义的Express程序替换[webpack-dev-server](https://github.com/webpack/webpack-dev-server)，让它更容易实现universal 渲染和为了不使这个包过于庞大。
2. 针对不同的loader采用了多线程编译，极大的加快了编译速度。
3. 可用ES6编译低版本IE代码【水有多深不得而知】
4. 启动新技术tree-shaking
5. 提供测试框架进行单元测试，代码覆盖率报告，可与[Travis-ci](https://travis-ci.org)和[Coveralls](https://coveralls.io)快速对接。【[配置说明](https://github.com/sayll/Sayll_Karma)】
6. Babel被配置[babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)可以让代码更优化。

### 关于【HTML】
1. 支持单页应用和多页应用的混合开发。
2. 自动引入页面的CSS和JS文件。无需手动设置URL。(所有文件hash的改变都会导致文件名改变,这里的资源引用全由内部自动完成)

### 关于【CSS】
1. css的模块化，预处理器的编译。（[支持`sass,scss,less,postcss`](#使用CSS预处理器)）
2. 针对低版本浏览器和其他浏览器内核的特殊性，启用[autoprefixer](https://github.com/postcss/autoprefixer)自动添加浏览器前缀
3. 可导入字体和字体图标，操作非常简单。（如[阿里系icon](http://www.iconfont.cn/)）【[配置文档](#高级)】
4. 防缓存的hash规则

### 关于【JS】
1. 支持ES5,ES6编写逻辑代码
2. 由于兼容性问题只可使用AMD规范的`require`,无法使用 `import` 和 `export`
3. 防缓存的hash规则
4. 快速编译，自动刷新。
5. 最好不要使用新的对象书写方式

## 程序目录

```
├── build                    # 所有打包配置项
├── config                   # 项目配置文件
│   ├── webpack              # webpack配置文件夹
│   └── karma.conf.js        # karma配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── static                   # 静态资源文件夹，将它视为项目根使用
|
├── app                      # 程序源文件
│   ├── html                 # 多页或单页应用的入口HTML
│   └──  source               # 公共的资源文件
│   ├    ├── css
│   ├    ├── js
│   ├    ├── font
│   ├    └── img             
│   ├── utils                # 辅助资源(所有内部文件通过index.js引入，可配置全局变量。)
│   └── view                 # 主路由和异步分割点
│       └── index            # 匹配html文件夹中的index.html。（css,js文件名对应文件夹名，可直接打包无需单独引入）
│           ├── index.js     # 直接与index.html匹配的入口文件，可以作为单页应用的入口，在内部定义自己的项目目录
│           ├── index.css    # 如是多页应用，可设置对应的CSS文件，直接匹配。
│           └── other **     # 页面的其他资源文件，通过index.js引入
└── tests                    # 单元测试
```

## 项目启动

### 环境配置
* 为了把保证项目正常运行，请自行更新相关环境。 
1. 安装[node.js](https://nodejs.org/)
2. 安装[git](https://git-scm.com/)
3. 安装[Yarn](https://yarnpkg.com/zh-Hans/)（可选）

### 依赖配置
1. 首先clone项目
```bash
$ git clone https://github.com/QingHuanMoon/SanFrameWork-IE8.git
$ cd ie-webpack-start
```
* 由于国内有一堵高墙的存在建议国内用户切换源地址：
```bash
$ npm run cnpm
```
以后请使用`cnpm`替代`npm`操作

2. 下载依赖
* 请确保你的环境配置完成，然后就可以开始以下步骤
  * `npm` 用户：
  ```bash
  $ npm install                   # Install project dependencies
  $ npm start                     # Compile and launch
  ```
  * `cnpm` 用户：
  ```bash
  $ cnpm install                   # Install project dependencies
  $ npm start                     # Compile and launch
  ```
  * `Yarn` 用户：
  ```bash
  $ yarn                          # Install project dependencies
  $ yarn start                    # Compile and launch
  ```
如果一切顺利,就能正常打开端口:[http://localhost:3000/](http://localhost:3000/)

### 命令说明

开发过程中，你用得最多的会是`npm start`，但是这里还有很多其它的处理：

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|启动3000端口服务，代码热替换开启。|
|`build`|单纯打包资源，不会进行代码测试。|
|`deploy`|删除旧文件，进行代码测试，打包相关文件（默认目录~/build）。|
|`test`|开启Karma测试并生成覆盖率报告。(默认关闭：[启动配置](/docs/Tests.md))|
|`visualizer`|打包资源分析|
|`clean`|清除打包的文件|
|`cnpm`|替换为淘宝镜像|
* 开发使用 `start`
* 调试IE使用 `build`
* 发布使用`deploy`

## 使用手册

### 基本



### 高级



### 发布
1. 打包命令
```bash
$ npm run build
```
或
```bash
$ npm run deploy
```
* 二者区别
  * `build` 无测试，速度最快，安全系数较低。
  * `deploy` 当单元测试功能开启时，`deploy`将添加一个检测项。只有所有测试通过时，才能正常打包。速度慢，安全系数最高。（默认关闭，开启请参考：[启动配置](/docs/Tests.md)）
2. 打包文件为`build`文件夹，请以此为根目录。



## 最重要的事情

* 亲不要吝啬自己的**Star**，右上角**Star**一下呗。

