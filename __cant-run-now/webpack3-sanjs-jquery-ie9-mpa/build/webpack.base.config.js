/**
 * webpack 基础配置
 * @type {[type]}
 */
// 引入配置
const config = require("./config")

// 工具
// const utils = require("./utils")
const generateMPAUtils = require('./utils/generate-mpa')

const fs = require('fs');
const path = require("path");
const webpack = require('webpack');


// 抽取 css
const ExtractTextPlugin = require("extract-text-webpack-plugin");



// 入口文件集合
var Entries = {}

const pages = generateMPAUtils.getEntryDir()
pages.forEach((page) => {
  // 寻找同名JS作为入口
  let pathJSFile = path.resolve(__dirname, `../src/${page.dir}/${page.filenameTitle}.js`);

  // 注意 判断文件是否存在需要时间
  if (!fs.existsSync(pathJSFile)) {
    pathJSFile = path.resolve(__dirname, '../src/views/templates/templates.js')
  }

  Entries[page.template] = pathJSFile;
})

// 第三方类库
// 暂时注释了, 好像没出问题
// let vendorsDir = generateMPAUtils.getVendors()
// if (vendorsDir.length > 0) {
//   Entries['vendors'] = vendorsDir
// }

let webpackconfig = {
  entry: Entries,
  devtool: "cheap-module-source-map",
  output: {
    filename: "static/js/[name].bundle.[hash].js",
    path: path.resolve(__dirname, config.common.devServerOutputPath),

    // 公共路径调整
    // publicPath: (process.env.NODE_ENV === 'dev') ? path.resolve(__dirname, '/static') : '/'
  },
  // 加载器
  module: {
    // 外部依赖可以 通过一些配置 提升性能
    noParse: [/moment.min/],

    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          publicPath: config.common.cssPublicPath,
          use: [
            {
              loader: "css-loader",
              options: {
                // 设置css模块化 名字随机处理
                // CSS模块化 https://www.jianshu.com/p/a5f3b41d5d44
                // @FIXME CSS编译 但是视图没有对应 
                // Nerv.js已经处理, 希望但还是改成.Vue模式  
                // modules: true,
                localIdentName: '[local]__[name]--[hash:base64:5]',
                // 开启 css 压缩
                minimize: true
              }
            },
            // {
            //   loader: "postcss-loader",
            //   options: {
            //     plugins: function () {
            //       return [require('autoprefixer')];
            //     }
            //   }
            // }
          ]
        })
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'stylus-loader', {
          loader: "postcss-loader",
          options: {
            plugins: function () {
              return [require('autoprefixer')];
            }
          }
        }]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              importLoaders: 1,
              plugins: function () {
                return [require('autoprefixer')];
              }
            }
          }]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            importLoaders: 1,
            plugins: function () {
              return [require('autoprefixer')];
            }
          }
        }]
      },

      // .san文件
      {
        test: /\.san$/,
        loader: 'san-loader'
      },
      {
        test: /\.(jade|pug)$/,
        loader: ['html-loader', 'pug-html-loader']
      },

      // 不需要配置,默认导入
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        // 使所有以 .json5 结尾的文件使用 `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // loader: 'babel-loader?cacheDirectory', // 使用cacheDirectory
          // loader: 'babel-loader', // 使用cacheDirectory
          loader: 'es3ify-loader',
          // options: {
          //     presets: ['es2015']
          // }
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            // 打包生成图片的名字
            name: "[name].[hash:7].[ext]",
            // 图片的生成路径
            outputPath: config.common.imgOutputPath
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(htm|html)$/i,
        use: [
          {
            loader: 'html-withimg-loader'
          },
          {
            loader: 'html-loader',
            options: {
              // 压缩
              minimize: true
            }
          }]
      }],

  },
  devtool: 'eval', //  cheap-module-eval-source-map | source-map
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        let flag =  module.context && module.context.indexOf('node_modules') !== -1;
        // console.log(module.context, flag);
        return flag;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // ( 公共chunk(commnons chunk) 的名称)
    //   name: "commons",
    //   // ( 公共chunk 的文件名)
    //   filename: "commons.bundle.js",
    //   // (模块必须被 2个 入口chunk 共享)
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // (选择所有被选 chunks 的子 chunks)
    //   children: true,
    //   async: 'vendor-async',
    //   // (在提取之前需要至少三个子 chunk 共享这个模块)
    //   minChunks: (module, count) => {
    //     // 被 2 个及以上 chunk 使用的共用模块提取出来
    //     return count >= 2
    //   }
    // }),

    // 将模块都放到一个闭包函数中，
    // 通过减少闭包函数数量从而加快JS的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 将 css 抽取到某个文件夹
    new ExtractTextPlugin({
      //生成css文件名
      filename: 'static/css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),


    // 自动生成 HTML 插件
    // ...HTMLPlugins,
    // new HtmlWebpackInlineSourcePlugin(),

    // @TODO 内联脚本等的处理


    // 提供jquery会被打包进去
    new webpack.ProvidePlugin({
      san: "san",
      // nerv: "nervjs"
    }),

  ],

  // 不需要打包的库文件，在模版文件中使用script引入
  // 使用cdn
  externals: {
    jquery: 'window.$',
    $: 'window.$',

    seajs: 'window.seajs',
    requirejs: 'window.requirejs',
    
    // 测试
    Navigo: 'window.Navigo'
  },

  resolve: {
    extensions: ['.js', '.css', '.styl', '.less', 'scss', '.ts', '.san'],
    alias: {
      // 覆盖 对接react生态
      'react': 'nervjs',
      'react-dom': 'nervjs',
      'create-react-class': "nerv-create-class",

      // 外部依赖可以 通过一些配置 提升性能
      'moment': 'moment/min/moment.min.js',

      // 资源路径
      "@": path.join(__dirname, "../src"),
      "src": path.join(__dirname, "../src"),
      "static": path.join(__dirname, "../static"),
      "assets": path.join(__dirname, "../src/assets"),

      // 组件
      // "~/Nerv/XXX" 引入组件
      "~": path.join(__dirname, "../src/components"),
      "components": path.join(__dirname, "../src/components"),

      // 视图
      "@tools": path.join(__dirname, "../src/tools"),
      "@less": path.join(__dirname, "../src/assets/styles/less/theme"),
      "@sass": path.join(__dirname, "../src/assets/styles/sass"),
    }
  }
}
module.exports = webpackconfig


