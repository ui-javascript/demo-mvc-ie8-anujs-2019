const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const chalk = require('chalk');
const basicConfig = require('./basic');
const creatCompiler = require('./config/webpackCompiler');
const paths = require('./paths');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

/* eslint-disable no-console */
const clog = console.log;
/* eslint-enable no-console */

process.env.NODE_ENV = 'production';

const webpackConfig = webpackMerge(basicConfig, {
  entry: {
    index: ['./src/index.js'],
    react: ['react', 'react-dom', 'react-router', 'react-redux'],
    vender: [
      'es5-shim',
      'es5-shim/es5-sham',
      'console-polyfill',
      'es6-promise',
      'fetch-ie8',
      'babel-polyfill',
    ],
  },
  output: {
    path: paths.appBuild, // 导出文件位置
    filename: 'js/[name].[chunkhash:8].js', // 编译文件名称
    chunkFilename: 'js/async-[id]-[name].[chunkhash:8].js', // 异步加载模块名称
    publicPath: '/', // 生成的打包文件引入 index.html 时会添加前缀。
  },
  // devtool: 'source-map',
  plugins: [
    // 复制静态资源到打包目录
    new CopyWebpackPlugin([{ from: 'public', ignore: ['index.html'] }], {
      copyUnmodified: true,
    }),
    // 清理dist文件夹
    new CleanWebpackPlugin(['build'], {
      root: paths.appRoot,
      verbose: false,
    }),
    // 精简输出
    new UglifyJSPlugin({
      compress: {
        properties: false,
        warnings: false,
      },
      output: {
        quote_keys: true,
      },
      mangle: {
        screw_ie8: false,
      },
      sourceMap: true,
    }),
    // 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // 插件可以将公共的依赖模块提取到已有的入口模块中，或者提取到一个新生成的模块。
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vender', 'common'],
      filename: 'js/[name].[chunkhash:8].js',
    }),
    // CSS隔离
    new ExtractTextPlugin('css/[name].[sha1:contenthash:base32:8].css', {
      allChunks: true,
    }),
    // 它会用新生成的index.html
    new HtmlWebpackPlugin({
      title: '君睿在线平台运营系统',
      template: 'public/index.html', // 首页模板
      inject: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
    // 打包可视化
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?minimize&importLoaders=1!postcss-loader'
          // 'css-loader?minimize&module&importLoaders=1!postcss-loader'
        ),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?minimize&importLoaders=1!less-loader?strictMath&noIeCompat'
          // 'css-loader?minimize&module&importLoaders=1!less-loader?strictMath&noIeCompat'
        ),
      },
    ],
  },
});

const compiler = creatCompiler(webpack, webpackConfig);

compiler.run((error, stats) => {
  if (error || stats.hasErrors()) {
    clog(chalk.red('编译失败'));
  } else {
    clog(
      stats.toString({
        colors: true,
        errors: false,
        warnings: false,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })
    );
  }
});
