const webpack = require('webpack'),
    files = require('./config/files'),
    merge = require('webpack-merge'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    Visualizer = require('webpack-visualizer-plugin');
CopyPlugin = require('copy-webpack-plugin');
let config = require('./webpack.config.js')({dev: false});

/** --------------------
 * 打包资源，性能分析
 * */
if (process.env.NODE_TEST === 'production') {
    config.plugins.push(
        new Visualizer({
            filename: './statistics.html'
        })
    )
}

module.exports = merge(config, {
    plugins: [
        new WebpackMd5Hash(),
        // 复制静态地址文件
        new CopyPlugin([
            {
                from: files.staticPath,
                to: files.buildPath,
                ignore: ['.*']
            }
        ]),

        // 暂时压缩代码会无法兼容
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     mangleProperties: {
        //         screw_ie8: false,
        //     },
        //     compress: {
        //         screw_ie8: false,
        //         properties: false,
        //         warnings: false,
        //
        //         // 移除console debugger
        //         drop_debugger: true,
        //         drop_console: true
        //     },
        //     output: {
        //         screw_ie8: false,
        //         beautify: true,
        //         quote_keys: true,
        //     }
        // }),
    ]
});