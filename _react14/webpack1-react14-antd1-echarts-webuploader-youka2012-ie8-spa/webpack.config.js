const path = require("path");
const dir = path.join.bind(path, __dirname);
const isProd = process.env.NODE_ENV === "production";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HappyPack = require("happypack");
const Es3ifyPlugin = require("es3ify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const currentConfig = require(isProd ? "./webpack.cfg" : "./webpack.cfg.dev");

const {debugIE,chunkStats,bundleAnalyzerPlugin} = require("./my-dev-config");
const fileHash = isProd ? "[chunkhash:5]" : "[hash:5]";

const commonConfig = {
    entry: {
        shim: [
            "es5-shim", // 支持 IE8 所必须,且顺序在babel-polyfill前
            "es5-shim/es5-sham",
            "html5shiv",
            "console-polyfill",
            "babel-polyfill",
            "media-match", // 支持 antd 所必须
        ],
        vendorChunk: ['react', 'react-dom', 'axios', 'react-router-dom', "js-cookie"],
        /* public: [
            dir("src/utils/public.js"),
         ],*/
        // jquery_chunk:[] //
    },
    output: {
        path: dir("dist"),
        filename: "assets/js/[name]." + fileHash + ".js",
        // 用import()按需加载 https://doc.webpack-china.org/api/module-methods/#import-
        chunkFilename: "assets/js/[name]." + fileHash + ".js",
        //生成的js/css文件的公共路径前缀，以应对形如：127.0.0.1:8888/xxxx（多了公共子路径xxxx）
        //若地址是127.0.0.1:8888/xxxx/ 则用./即可
        publicPath: "./",
    },
    module: {
        noParse: /node_modules\/(jquey|moment|chart\.js)/,
        postLoaders: (debugIE || isProd) ? [{
            test: /\.jsx?$/i,
            loader: "happypack/loader?cacheDirectory=true&id=pre",
        }] : null,
        loaders: [
            {
                test: /\.jsx?$/i,
                loader: "happypack/loader?cacheDirectory=true&id=jsx",
                include: dir("src"),
                // exclude:dir("src/static"),
                exclude: path => !!path.match(/node_modules|src\/assets/),
            },
            /*{
                test: /\.(jpe?g|png|gif|bmp|ico)(\?.*)?$/i,
                loader: "url-loader?limit=2048&name=url-img/[name].[hash:5].[ext]",
            },*/
            //url图片路径，如background: url("../../assets/url-img/login/header_bg.jpg") no-repeat;
            {
                test: /\.(jpe?g|png|gif|bmp|ico)(\?.*)?$/i,
                loader: "url-loader?limit=8048&name=assets/url-img/[name].[hash:5].[ext]&publicPath=../../",
            },
            {
                test: /\.(woff2?|svg|ttf|otf|eot)(\?.*)?$/i,
                loader: "url-loader?limit=2048&name=font/[name].[hash:5].[ext]",
                exclude: path => !!path.match(/node_modules|src\/assets/),
            },
        ],
    },
    plugins: [
        /*new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/jquery-manifest.json')
        }),*/
        /* webpack.DllReferencePlugin({
             context: __dirname,
             manifest: require('./build/dllvendor-manifest.json')
         }),*/
        //本地打包分析配置
        !!bundleAnalyzerPlugin?new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: '9998',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: false,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            logLevel: 'info'
        }):()=>{},
        new webpack.BannerPlugin('auth_ma_chao'),
        //加上则注释不能用，请手动书写script标签形式引入jquery及其插件
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),*/
        (debugIE || isProd) ? new HappyPack({
            id: "pre",
            threads: 4,
            loaders: [{
                loader: "export-from-ie8/loader",
                options: {
                    cacheDirectory: true,
                },
            }],
        }):()=>{},
        new HappyPack({
            id: "jsx",
            threads: 4,
            loaders: [{
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            }],
        }),
        new CopyWebpackPlugin([
            {
                from: "src/assets/static",
                to: "assets/static",
            },
            {
                from: "src/assets/static-img",
                to: "assets/static-img",
            },
            /*{
                context: "build",
                from: "*.js",
                to: "static/vendors",
            },*/
        ]),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",//
            //children:true,antdChunk
            minChunks: 2,
            chunks:["appChunk","vendorChunk"]
        }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "lineChunk",
            minChunks: 2,
            chunks:["appChunk","sysChunk"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "sysChunk",
            minChunks: 15,
            chunks: ["user_management","unit_management","task_management","session_management","channel_management","domain_management","permission_management","operation_management","resource_management","rule_management","param_setting_management","param_type_management","menu_management","dict_data_management","dict_type_management","role_management","log_management"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "appChunk",
            minChunks: 8,
            chunks: [ "basic_data", "data_reveal", "examine_data", "integrated_management", "outer_data", "parallel_run", "support_service","system_management"]
        }),*/
        new webpack.optimize.CommonsChunkPlugin({
            name: "appChunk",
            minChunks: 2,
            chunks: ["index", "home", "docs", "doc-react", "antd-demos", "demo-select"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "baseChunk",//
            minChunks: 2,
            chunks: ["appChunk", "vendorChunk"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "runtime",
            minChunks: Infinity,
        }),
        /*   new webpack.optimize.CommonsChunkPlugin({
               name: ["appChunk","runtime"],
               filename:"[name].[hash:5].js",
               minChunks: Infinity,
           }),

           new webpack.optimize.CommonsChunkPlugin({
               name: "common",
               filename:"[name].[hash:5].js",
               chunks: ["index", "home", "basic_data", "data_reveal", "examine_data", "integrated_management", "outer_data", "parallel_run", "support_service", "system_management", "user_management", "unit_management", "task_management", "session_management", "channel_management", "domain_management", "permission_management", "operation_management", "resource_management", "rule_management", "param_setting_management", "param_type_management", "menu_management", "dict_data_management", "dict_type_management", "role_management", "log_management"]
           }),*/

        /*new webpack.optimize.CommonsChunkPlugin({
            name: "react_chunk",
            minChunks: 1
        }),*/
        /*new webpack.ContextReplacementPlugin(
            /moment[\\/]locale$/i,
            /^\.\/zh-cn$/i,
        ),*/
        new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
        (debugIE || isProd) ? new Es3ifyPlugin():()=>{},
        !!chunkStats?function () {
            this.plugin("done", function (stats) {
                const fs = require('fs');
                fs.writeFile(path.join(__dirname, "stats_inner.json"), "", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
                fs.writeFileSync(
                    path.join(__dirname, "stats_inner.json"),
                    JSON.stringify(stats.toJson()));

            });
        }:()=>{}
    ],
    resolve: {
        alias: {
            /*api: dir("src/api"),
            components: dir("src/components"),
            containers: dir("src/containers"),
            constants: dir("src/constants"),
            reducers: dir("src/reducers"),
            actions: dir("src/actions"),
            routes: dir("src/routes"),
            styles: dir("src/styles"),
            views: dir("src/views"),
            utils: dir("src/utils"),
            "@": dir("src"),*/
        },
        root: path.resolve('src'),
        modulesDirectories: ['node_modules'],
        extensions: ["", ".js", ".jsx", ".json"],
    },
    performance: {
        hints: false,
    },
    /*externals: {
        'jquery': 'window.$',
    }*/
};
const addPagePlugin = name => {
    const app = name ? name + "/index" : "index";
    commonConfig.entry[app] = [
        dir("src/views/" + app + ".js"),
    ];
    commonConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: app + ".html",
            template: dir("src/index.html"),
            title: "react-antd-webpack-ie8演示",
            chunks: ["runtime", "shim", "baseChunk", "appChunk", app],//
            chunksSortMode: "manual",
            inject: true,
            xhtml: true,
            hash: true,
            //模板文件index.html静态资源路径前缀,暂时无用
            staticPath: '/peas',
        })
    );
};
const pageList = [""]; // 多页面打包
pageList.forEach(v => addPagePlugin(v));
// commonConfig.output.publicPath = pageList.length > 1 ? "/" : "./";

module.exports = merge(commonConfig, currentConfig);