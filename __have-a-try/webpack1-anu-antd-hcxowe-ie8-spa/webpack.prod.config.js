const path = require('path')
const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')

const extractCSS = new ExtractTextPlugin('css/one.css');
const extractLESS = new ExtractTextPlugin('css/two.css');

module.exports = {
    entry: {
        polyfil: './src/polyfill.js',
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "react": "anujs/dist/ReactIE.js",
            "react-dom": "anujs/dist/ReactIE.js",
            'prop-types': 'anujs/lib/ReactPropTypes',
            'devtools' : "anujs/lib/devtools",
            'create-react-class': 'anujs/lib/createClass'
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                //loader: 'style-loader!css-loader'
                loader: extractCSS.extract('css-loader')
            },
            {
                test: /\.less$/,
                //loader: 'style-loader!css-loader!less-loader'
                loader: extractLESS.extract('css-loader!less-loader')
            },
            {
                test: /\.(png|jpg|gif|bmp|svg|swf)(\?.*$|$)/, 
                loader: 'url-loader?limit=2048&name=[name].[ext]&outputPath=/img/'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader?limit=2048&name=[name].[ext]&outputPath=/fonts/'
            }
        ]
    },
    plugins: [
        new Es3ifyPlugin(),
        extractCSS,
        extractLESS,
        new webpack.optimize.UglifyJsPlugin({mangle : false, output : {keep_quoted_props:true}, compress : {properties:false, drop_console: true},comments:false}),
        new CleanWebpackPlugin("dist", { root: path.resolve(__dirname, ".") }),
        new HtmlWebpackPlugin({template : "./index.html"})
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        progress: true,
        outputPath: path.resolve(__dirname, 'dist'),
        host: "0.0.0.0",
        port: 7035
    },
    devtool: 'source-map'
}