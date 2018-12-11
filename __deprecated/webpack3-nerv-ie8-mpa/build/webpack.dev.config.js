/**
 * 开发环境配置文件
 */

const config = require('./config')
const merge = require('webpack-merge')
const utils = require("./utils")
const generateMPAUtils = require("./utils/generate-mpa")

const fs = require('fs')
const path = require("path")
const webpack = require('webpack')
// const glob = require("glob")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
const createMpaNav = require('./utils/create-mpa-nav')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  //   // 项目根目录
  //   contentBase: config.devServerOutputPath,
  //   // 错误、警告展示设置
  //   overlay: {
  //     errors: true,
  //     warnings: true
  //   }
  // },

  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

// 通过 html-webpack-plugin 生成的 HTML 集合
var HTMLPlugins = [];

// 生成多页面的集合
const pages = generateMPAUtils.getEntryDir()
pages.forEach((page) => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${page.module}/${page.filenameTitle}.html`,
    // filename: `${page.dir}${moduleNameStr}.html`,
    template: path.resolve(__dirname, `../${page.template}`),
    inlineSource: '.(js|css)$', // embed all javascript and css inline

    // @FIXME 需要考虑具体引入模块
    // chunks: ['commons', moduleNameStr, 'vendors', 'manifest'],
    chunks: ['commons', page.template, 'vendor', 'manifest'],
  });

  // console.log('htmlPlugin push >>>>> ' + JSON.stringify(htmlPlugin))
  HTMLPlugins.push(htmlPlugin);
  
  // inline 
  // @FIXME undefined source
  // HTMLPlugins.push(new HtmlWebpackInlineSourcePlugin())

  // @FIXME 路径不正确
  // HTMLPlugins.push(
  //   new PreloadWebpackPlugin({
  //     rel: 'preload',
  //     as: 'script',
  //     include: 'all'
  //   })
  // )

})

createMpaNav(pages, config.dev.port, config.dev.env)
let indexHtmlPlugin = new HTMLWebpackPlugin({
  filename: `index.html`,
  template: path.resolve(__dirname, `../src/views/index.html`),
  // inlineSource: '.(js|css)$', // embed all javascript and css inline
  chunks: ['commons', 'index'],
});
HTMLPlugins.push(indexHtmlPlugin);

// console.log('入口 -> ' + JSON.stringify(Entries))
// console.log('HTML -> ' + JSON.stringify(indexHtmlPlugin))

module.exports.plugins.push(...HTMLPlugins)
// module.exports.entry['index'] = path.resolve(__dirname, '../src/views/index.js')
