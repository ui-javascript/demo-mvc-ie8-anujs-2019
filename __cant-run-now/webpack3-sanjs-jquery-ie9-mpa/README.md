# 基于Webpack的多页面解决方案

- san | nerv.js作为公共vendors提取
- UI采用luluUI(@Author:张鑫旭) 与 LayUI(@Author:贤心)
- san + san MUI
- nerv暂时配有合适UI
- jquery -> cdn + external配置
- 偶尔一些老页面辅助jquery ui与之前项目的JS Libs
- pug与html作为入口文件 js保持同名 没有的话生成空的js作为入口文件
- 使用ts-loader3.X.X, 之前的ts-loader4.x.x是指支持webpack4的
- typescript暂时只是libs或许工具类用用
- components -> views -> pages (颗粒度弄细一点，复用度稍微高一点)
- 简单生成入口导航页面
- eslint不做,项目质量参差不齐...
    
```html
<!-- lulu UI cdn-->
<link rel="stylesheet" href="//qidian.gtimg.com/lulu/theme/peak/css/common/ui.css">
<script src="//qidian.gtimg.com/lulu/theme/peak/js/plugin/sea.js"></script>

<script src="https://cdn.bootcss.com/require.js/2.3.5/require.min.js"></script>
<script src="https://cdn.bootcss.com/seajs/3.0.2/sea.js"></script>
```

- TODO

```js 
// @TODO 提取公共模块测试，不要重复引入 FIX 
// @TODO less分模块引入以及模块化
// @TODO 内联样式与资源
// @TODO 整理配置文件
// @TODO 打包时的报错机制修复
// @TODO 兼容IE8的一些配置与处理(还有一些配置没做和测试)

// Later: 
// @TODO 测试功能修复

// Deprecated:
// @TODO -> webpack4(目前坑比较多，不升级)
```

- less | sass 分模块引入以及模块化
    - 大段css的用 /**/ 不要用 //, 会报错的暂时没处理    
    - webpack + vue + less 全局变量的解决方案 https://www.jianshu.com/p/2d569644c996

```
@import "../../config/_import";
@import "../../utilities/_import";

```

- 已知问题

```
san单页面测试 history修改url无法正常访问

IE8的兼容 nerv.js又奔溃了

html-webpack-inline-source-plugin 这个插件使用一直报错 
preload-webpack-plugin 配置有误
```
    
- 备份

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "spec": true,
        "useBuiltIns": false
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "Nerv.createElement"
      }
    ],
    "babel-plugin-transform-es3-member-expression-literals",
    "babel-plugin-transform-es3-property-literals",
    "istanbul"
  ]
}

```    