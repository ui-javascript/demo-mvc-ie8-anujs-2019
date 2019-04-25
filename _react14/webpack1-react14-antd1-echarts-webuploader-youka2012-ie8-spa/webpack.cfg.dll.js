const path    = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        dllvendor: ['react','react-dom','react-router-dom','jquery'],
    },
    output: {
        path: path.join(__dirname,'build'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.DllPlugin({
            path: path.join(__dirname,'build', '[name]-manifest.json'),
            filename: '[name].js',
            name: '[name]'
        })
    ]
};