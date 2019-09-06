const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const ROOT_PATH = path.resolve(__dirname, ".");
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        main: './src/index.js'
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    //如果不需要react这段可以去掉
    resolve: {
        root: ['./src/scss'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            "react": "anujs/dist/ReactIE.js",
            "react-dom": "anujs/dist/ReactIE.js",
            'prop-types': 'anujs/lib/ReactPropTypes',
            'devtools': "anujs/lib/devtools",
            'create-react-class': 'anujs/lib/createClass'
        }
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)(\?.*$|$)/, exclude: /node_modules/, loader: 'babel-loader'},
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            /*     {
                     test: /\.(png|jpg|gif)$/,
                     loader: 'file-loader',
                     useRelativePath:true,
                     query:{
                         name:'img/[name]-[hash:5].[ext]'  //这里img是存放打包后图片文件夹，结合publicPath来看就是/webBlog/build/img文件夹中，后边接的是打包后图片的命名方式。
                     }
                 },*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]',
                    publicPath: "/anu-antd-axios-echarts-ie8/dist/"//处理css引用图片相对路径问题
                }
            },
            // {test: /\.json$/,loader: "json"},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?modules=true&sourceMap=true!postcss!sass", {publicPath: "./"})
            }
        ],
        postLoaders: [
            {test: /\.(js|jsx)(\?.*$|$)/, loader: "es3ify-loader"},
            // {test: /\.(js|jsx)$/, loader: 'export-from-ie8/loader'}
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new es3ifyPlugin(),
        new ExtractTextPlugin("./css/[name].[hash:5].css"),
        new HtmlWebpackPlugin({template: "src/index.html", favicon: './favicon.ico'}),

        // 其他项目的配置
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false,
                screw_ie8: false
            },
            output: {
                comments: false,
                beautify: false,
                quote_keys: true,
                screw_ie8: false
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: true
        }),

        // 原来的配置
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: false,
        //     output: {
        //         keep_quoted_props: true
        //     },
        //     compress: {
        //         properties: false,
        //         drop_console: true
        //     },
        //     comments: false
        // }),
        // anu官网说的配置
        // new UglifyJsPlugin({
        //     parallel: {
        //         cache: true,
        //         workers: 4,
        //     },
        //     uglifyOptions: {
        //         mangle: {
        //             eval: true,
        //             toplevel: true,
        //         },
        //         parse: {
        //             html5_comments: false,
        //         },
        //         output: {
        //             comments: false,
        //             ascii_only: true,
        //             beautify: false,
        //         },
        //         ecma: 5,
        //         ie8: false,
        //         compressor: {
        //             properties: true,
        //             unsafe: true,
        //             unsafe_comps: true,
        //             unsafe_math: true,
        //             unsafe_proto: true,
        //             unsafe_regexp: true,
        //             unsafe_Func: true,
        //             dead_code: true,
        //             unused: true,
        //             conditionals: true,
        //             keep_fargs: false,
        //             drop_console: true,
        //             drop_debugger: true,
        //             reduce_vars: true,
        //             if_return: true,
        //             comparisons: true,
        //             evaluate: true,
        //             booleans: true,
        //             typeofs: false,
        //             loops: true,
        //             toplevel: true,
        //             top_retain: true,
        //             hoist_funs: true,
        //             hoist_vars: true,
        //             inline: true,
        //             join_vars: true,
        //             cascade: true,
        //             collapse_vars: true,
        //             reduce_vars: true,
        //             negate_iife: true,
        //             pure_getters: true,
        //             pure_funcs: true,
        //             // arrows: true,
        //             passes: 3,
        //             ecma: 5,
        //         },
        //     },
        //     sourceMap: false,
        // }),
        new CleanWebpackPlugin("dist", {root: ROOT_PATH})
    ]
}
