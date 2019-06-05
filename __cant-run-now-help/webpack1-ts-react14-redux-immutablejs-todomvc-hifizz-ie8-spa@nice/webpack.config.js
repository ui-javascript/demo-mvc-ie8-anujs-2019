/**
 * Webpack 配置，需要拆成dev和prd
 * @author stack fizz <fizzstack@gmail.com>
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取代码执行环境变量 'production' 'development'
let ENV_NODE_ENV = process.env.NODE_ENV || 'production';

// 临时设置一下
ENV_NODE_ENV = "development";

// 根据当前执行环境变量设置build输出的目录
// map 关系是这样的：
// 'production'    ---> './build/prd'
// 'development'   ---> './build/dev'
let ENV_DIST_DIR;
switch (ENV_NODE_ENV) {
  case 'development':
    ENV_DIST_DIR = 'dev';
    break;
  case 'production':
    ENV_DIST_DIR = 'prd';
    break;
  default:
    ENV_DIST_DIR = 'dev';
}

const normalSCSSLoaders = {
  // ExtractTextPlugin.extract 需要为loader，这里是loaders
  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/110
  test: /\.(css|scss)$/,
  loaders: [
    "style",
    "typings-for-css-modules-loader?namedExport=true&modules&localIdentName=[local]---[hash:base64:8]&importLoaders=2",
    "postcss",
    "sass"
  ]
};

const extractSCSSLoaders = {
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract(
    "style",
    "typings-for-css-modules-loader?namedExport=true&modules&localIdentName=[path][name]---[local]---[hash:base64:5]&importLoaders=2!postcss!sass"
  )
};

// todo: 使用react外部cdn
const config = {
  devtool: 'source-map',

  devServer: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },

  entry: {
    index: [path.resolve(__dirname, './src/todomvc/index.tsx')],
    vendors: [
      "es5-shim",
      "es5-shim/es5-sham",
      'console-polyfill',
      'babel-polyfill',
      'es6-promise',
      'fetch-ie8',
      'qs'
    ]
    // , webpack: "webpack/hot/dev-server"
  },

  output: {
    path: path.resolve(__dirname, 'build', ENV_DIST_DIR),
    filename: 'js/[name].[chunkhash:8].js',
    //publicPath: conf.staticResource
    // publicPath: './'
  },

  resolve: {
    enforceExtension: false,
    extensions: ['', '.tsx', '.ts', '.jsx', '.js', '.css', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=2048&name=img/[name].[hash:8].[ext]&publicPath=./'
      }
    ],

    preLoaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: ['tslint-loader'],
      },
    ],

    // 这里设置`es3ify-loader`为后处理loader。
    // 在 (ts|tsx|js|jsx) 被其他loader处理过之后，将会在这里再被处理一遍。
    // 主要处理的问题是，IE8下的关键字'default', 'delete', 'catch' 常常用作为三方库的方法。
    // 或者 关键字作为对象的key
    // 例如 e.default , map.delete, var a = {class: '123'};
    // `es3ify-loader` 会把这些关键字用 [""] 包起来。
    // before: e.default
    // after : e["default"]
    postLoaders: [{
      test: /\.(ts|tsx|js|jsx)$/,
      // exclude: /node_modules/,
      loaders: ['es3ify-loader'],
    }],
  },

  // tslint-loader 的配置项
  // https://github.com/wbuchwalter/tslint-loader#loader-options
  tslint: {
    fix: true // 自动根据 prettier 的配置去fix代码风格
  },

  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'],
      minChunks: Infinity,
      filename: 'js/[name].[hash:8].js'
    }),

    new ExtractTextPlugin('css/main.[hash:8].css'),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['index', 'vendors', 'manifest'],
      filename: 'index.html'
    })
  ]
};

// 开发环境
if (ENV_NODE_ENV === 'development') {
  config.devtool = 'source-map';

  config.module.loaders.push(normalSCSSLoaders);

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  );

}

// 生产环境
if (ENV_NODE_ENV === 'production') {

  config.module.loaders.push(extractSCSSLoaders);
  config.plugins.push(new ExtractTextPlugin('css/main.[hash:8].css'));

  // 暂时发现这里会导致redux-logger的undefined会变成 "undefined"
  new webpack.optimize.UglifyJsPlugin({
    // 压缩时
    compress: {
      warnings: false,
      screw_ie8: false // 不抛弃IE8
    },
    // 混淆时
    mangle: {
      screw_ie8: false // 不抛弃IE8
    },
    // 输出时
    output: {
      screw_ie8: false // 不抛弃IE8
    }
  })

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
}

module.exports = config;
