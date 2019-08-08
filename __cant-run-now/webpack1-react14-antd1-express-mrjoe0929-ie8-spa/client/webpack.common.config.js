const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 自动打开浏览器
let url = 'http://localhost:8080';

commonConfig = {
    entry: {
        app: [
            "es5-shim",
            "es5-shim/es5-sham",
            "babel-polyfill",
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    module: {
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['export-from-ie8/loader', 'es3ify-loader']
            }
        ],
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
        }, {
            test: /\.html$/,
            loader: 'html-withimg-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            favicon: path.join(__dirname, './public/img/favicon.ico'),
            minify: {
                // 参数同gulp压缩html参数
                removeComments: true, // 清除html注释
                collapseWhitespace: true, //压缩html（删除空格和换行）
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                minifyCSS: true, //压缩页面css
                minifyJS: true //压缩页面js
            },
            chunks: ['app']
        }),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // }),
        new es3ifyPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: url })
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            routerConfig: path.join(__dirname, 'src/routerConfig'),
            static: path.join(__dirname, 'src/static')
        }
    }
};

module.exports = commonConfig;
