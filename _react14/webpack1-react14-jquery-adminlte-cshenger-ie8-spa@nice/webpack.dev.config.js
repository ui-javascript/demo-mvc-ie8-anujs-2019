var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        "es5-shim", "es5-shim/es5-sham", 'babel-polyfill', './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new es3ifyPlugin()
    ],
    resolve: {
        extensions: [
            '', ".js"
        ],
        root: path.join(__dirname, 'src')
    },
    module: {
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
                loader: 'url-loader?limit=1'
            }, {
                test: /\.(htc)$/,
                loader: 'url-loader?limit=1'
            }
        ]
    }
};