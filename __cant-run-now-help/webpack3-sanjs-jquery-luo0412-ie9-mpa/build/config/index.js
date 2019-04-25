/**
 * 配置文件
 */
const path = require('path')
var merge = require('webpack-merge')

let defaultConfig = {
  
  moduleName: 'pages',

  // 公共配置
  common: {
    
    // CSS公共目录???
    cssPublicPath: "../static",

    // 图片
    imgOutputPath: "img/",

    // build后的目录
    devServerOutputPath: "../dist",

    // 模板语法，暂时只支持html、pug
    tplLang: 'pug|html',

    // 工具库
    libraryDir: 'tools/libs',
  },

  // 打包配置
  build: {
    // 是否兼容IE8(注意, 开发测试的时候不兼容IE8)
    tolerateIE8: true,
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 输出资源的存放位置
    assetsSubDirectory: 'static',

    // 公共资源位置
    assetsPublicPath: 'static',

    // 视图文件输出位置 dist/(templates)/
    // 直接输出 '' 或 'templates/'
    assetsHtmlPath: '',

    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 开发配置
  dev: {
    env: require('./dev.env'),
    port: 9999,
    
    // 自动打开
    autoOpenBrowser: true,
    pageIndex: '/index.html',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}


// 修改此处
const sysName = process.env.SYS_NAME.toString().trim() || 'san'

var detailConfig = require(`./system/${sysName}`)
console.log('系统运行目录: ' + sysName)

module.exports = merge(defaultConfig, detailConfig)
