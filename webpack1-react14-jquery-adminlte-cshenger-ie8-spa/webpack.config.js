var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        "es5-shim", "es5-shim/es5-sham", 'babel-polyfill', './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: '[name].[hash:5].chunk.js'
    },
    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.LimitChunkCountPlugin({maxChunks: 120}),
        //new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        //new webpack.optimize.DedupePlugin(),
        //new ExtractTextPlugin('[name].[contenthash:5].chunk.css'),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify('development')
        //     }
        // }),
        new es3ifyPlugin()
    ],
    resolve: {
        extensions: [
            '', '.js'
        ],
        root: path.join(__dirname, 'src')
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loader: 'stripcomment-loader'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['export-from-ie8/loader']
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                     presets: ['react', 'es2015']
                },
                include: __dirname
            }, {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.(htc)$/,
                loader: 'url-loader?limit=1'
            }, {
                test: /\.json/,
                loaders: ['json-loader']
            }
        ]
    }
};