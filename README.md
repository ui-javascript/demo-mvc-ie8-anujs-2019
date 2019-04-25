# README

# 统一如下事项

- 测试node.js: v10.15.1 --> 建议备注一下版本号
- 打包目录名为dist
- 工程名格式

```
构建工具v(webpack/gulp)
+ js-framework(react/vue) 
+ UI/技术特点(antd/elementui) 
+ author 
(+ simple ) --> 尽量带UI或场景示范，没有UI的加`simple`
(+ old ) --> 技术栈太旧
+ 应用场景(h5/pc/IE8?) 
+ mpa/spa
```

- 命令行

```shell
# 开发
npm run dev/serve/start

# 打包
npm run build/build:dist/dist
```

- 尽量支持yarn安装 --> 这样不用因为更换了路径而重新安装依赖

# TODO

- 使用anujs + antd1 搭一个完善点的template

# 区别

- anu @nice
- react14 @nice
- avalon2
- angular1
- regular
    - 类react库，但是不够活跃
    
- san @deprecated 
    - @issue 什么时候提供类似vuecli的快速开发框架 
        - https://github.com/baidu/san/issues/280
    - webpack打包几乎难以兼容 IE8(san-router)  @deprecated
    - 没有官方出品兼容IE8的UI库
    - 不存在所谓的类Vue开发体验 -> API存在较大差异，这是不小的学习成本
    
- nervjs @deprecated
    - 目前都没有试出兼容IE8(+router)的示例，存疑!!
    
- knockout @deprecated
    - 开发模式落后 -> 较高学习成本

# 怀疑人生

```
以下操作仅当遇到坑的时候考虑一下
实在不确定😂
```
    
- 用nvm切换版本之后, 环境上也许并没有彻底切换过来 --> 重装nodejs    
- nodejs也许可以降到 v8.9.0 -> 可能webpack与node.js版本有关
- yarn/npm/cnpm install 都试试看 
    
    - 大概率npm安装是没问题的
    - 不需要等安装命令彻底结束，可能就已经可以npm run dev了
    - 记得翻墙Proxy再安装
    
- 不要用IDEA的命令行按钮直接运行  -> 可能有坑, IDEA运行时要选择node版本



