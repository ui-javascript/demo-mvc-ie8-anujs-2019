module.exports = {
    debugIE:false,//是否在开发环境进行ie8调试
    devPort:8888,//开发环境服务器端口
    //反向代理配置
    proxyConfig: {
        "/api/*": {
            target: "http://localhost:8989",
            secure: false,
            changeOrigin: false,
        },
        "/druid": {
            target: "http://localhost:8989",
            secure: false,
            changeOrigin: false,
        },
    },
    chunkStats:false,//是否生成打包分析文件，供上传分析网站 http://webpack.github.io/analyse/可视化分析项目模块
    bundleAnalyzerPlugin:false//是否在9998端口输出模块分析可视化界面
};