# README

# 统一事项

- 尽量使用yarn安装 --> 不需要更换路径重新安装依赖
- 打包目录统一为dist
- 命名格式
- 尽量带UI示范，没有UI的加`simple`标识

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

# 诡异操作

```
以下操作仅当遇到坑的时候考虑一下, 不确定😂
```
    
- 不要用nvm切换版本 --> 可能环境上有点问题    
- node版本可以降到 v8.9.0 -> 可能webpack与版本有关
- 安装依赖时Proxy
- 不要用IDEA的命令行按钮直接运行  -> 可能有坑



