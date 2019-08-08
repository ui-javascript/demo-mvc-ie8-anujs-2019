# README

# 约定


- 打包目录名统一为`dist`
- 工程名称格式

```
构建工具(webpack/gulp)
+ framework(react/vue/...) 
+ 技术特点/UI组件(antd/elementui) 
+ 作者 
+ ...
+ 应用场景(h5/IE8+/firefox) 
(+ mpa/spa) 
(+ admin/mall) 
```

- package.json命令行格式

```shell
# 开发
npm run dev/serve/start

# 打包
npm run build/build:dist/dist
```

- 尽可能支持yarn安装
- 备注nodejs版本号(v10.15.3)

# 解决方案

- anu @nice
- react14 @nice
- avalon2
- angular1
- regular
- yoxjs    
- san @deprecated 

    - 使用webpack打包难以兼容IE8(+san-router)  @deprecated
    - 没有官方出品IE8+的UI库
    - 与Vue的API存在较大差异 

```
// 什么时候提供类似vuecli的快速开发框架 
https://github.com/baidu/san/issues/280
```
    
- nervjs @deprecated
    - 没有试出兼容IE8(+router)的示例，存疑!!
    
- knockout @old @deprecated

# 测到怀疑人生

```
以下操作仅当遇到坑的时候考虑一下
实在不确定原因😂
```
    
- nvm切换版本之后, 环境上可能没有彻底切换过来 --> 重装nodejs    
- nodejs也许需要降到低版本(eg. v8.9.0)
- yarn/tyarn/npm/cnpm install 都试试看 
    
    - 大概率npm安装是没问题的
    - 不需要等安装命令彻底结束，可能就已经可以npm run dev了
    - 但有几个老项目哪怕最终报错也一定要等它安装完
    - 记得翻墙Proxy再安装
    
- 不要用IDEA的命令行按钮直接运行  

```
IDEA运行前要配置对应node版本
```



