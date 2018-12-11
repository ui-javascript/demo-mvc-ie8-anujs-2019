const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const basicConfig = require('./basic');
const creatCompiler = require('./config/webpackCompiler');
const choosePort = require('./config/choosePort');
const proxy = require('./proxy');
const paths = require('./paths');

/* eslint-disable no-console */
const clog = console.log;
/* eslint-enable no-console */

process.env.NODE_ENV = 'development';

const webpackConfig = webpackMerge(basicConfig, {
  entry: {
    index: [
      'es5-shim',
      'es5-shim/es5-sham',
      'console-polyfill',
      'es6-promise',
      'fetch-ie8',
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000/',
      'webpack/hot/dev-server',
      // './mock/mock.js',
      './src/index.js',
    ],
  },
  output: {
    path: paths.appDev, // 导出文件位置
    filename: '[name].[hash:8].js', // 编译文件名称
    chunkFilename: 'async-[name].[hash:8].js', // 异步加载模块名称
    publicPath: '/', // 生成的打包文件引入 index.html 时会添加前缀。
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // 复制静态资源到打包目录
    new CopyWebpackPlugin([{ from: 'public', ignore: ['index.html'] }], {
      copyUnmodified: true,
    }),
    // 它会用新生成的index.html
    new HtmlWebpackPlugin({
      title: '首页',
      template: 'public/index.html', // 首页模板
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader',
        // loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader?strictMath&noIeCompat',
        // loader:
        //   'style-loader!css-loader?modules!less-loader?strictMath&noIeCompat'
      },
    ],
  },
});

// 端口号
const PORT = 3000;
// 校验端口是否已被占用
choosePort(PORT).then(port => {
  if (port == null) {
    return;
  }

  const compiler = creatCompiler(webpack, webpackConfig);
  const devServer = new WebpackDevServer(compiler, {
    // contentBase: resolve(__dirname, 'dev'), // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问
    host: '0.0.0.0', // 指定使用一个 host
    port, // 监听端口
    hot: true, // 启用 webpack 的模块热替换特性
    overlay: true, // 当出现编译错误或警告时，在浏览器中显示一个全屏覆盖。
    compress: true, // 一切服务都启用 gzip 压缩
    quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    disableHostCheck: true,
    // stats: {
    //   colors: true,
    //   errors: false,
    //   warnings: false,
    //   modules: false,
    //   children: false,
    //   chunks: false,
    //   chunkModules: false,
    // },
    proxy,
    historyApiFallback: { disableDotRule: true },
  });

  devServer.listen(port, '0.0.0.0', () => {
    clog('开发服务器启动中');
  });
});
