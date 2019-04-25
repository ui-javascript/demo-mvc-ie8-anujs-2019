const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const CompressionPlugin = require('compression-webpack-plugin');
// var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); //并发压缩，不兼容ie8,已卸载

//css打包路径
const lessLoader = new ExtractTextPlugin(
    "assets/css/[name].[contenthash:5].css",
    {allChunks: true}
);
const publicConfig = {
    devtool: false,
    // devtool: "source-map",
    module: {
        loaders: [
            {
                test: /_\.css$/i,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[hash:base64:8]", "postcss-loader"),
            },
            {
                test: /[^_]\.css$/i,
                loader: ExtractTextPlugin.extract("style-loader","css-loader?minimize", "postcss-loader"),
            },
            {
                test: /\.less$/i,
                loader: lessLoader.extract(["css", "postcss", "less"]),
                // 这里不需要 style-loader, 加了反而报错
                // less在生产环境的编译配置很特殊 https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/webpack-1/README.md
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["./dist/*"]),
        new webpack.DefinePlugin({
            "process.env": {"NODE_ENV": JSON.stringify("production")},
            // jQuery: "jquery",
            // $: "jquery"
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HashedModuleIdsPlugin(),
        /*new ParallelUglifyPlugin({ //开启后IE8报错
            cacheDir: '.cache/',
            uglifyJS:{
                sourceMap: false,
                uglifyOptions: {
                    ie8: true,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    compress: {
                        warnings: false
                    },
                },
                cache: true,
            }
        }),*/
        new UglifyJSPlugin({
            sourceMap: false,
            uglifyOptions: {
                ie8: true,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false,
                    drop_debugger:true,
                    drop_console:true,
                    pure_funcs:['console.log']
                },
            },
            cache: true,
        }),
       /* new CompressionPlugin({ //开启gizp压缩 可用
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),*/
       /* new ExtractTextPlugin(
            "dist/css/[name].[contenthash:5].css",
            {allChunks: true}
        ),*/
        lessLoader,
    ],
};

module.exports = publicConfig;