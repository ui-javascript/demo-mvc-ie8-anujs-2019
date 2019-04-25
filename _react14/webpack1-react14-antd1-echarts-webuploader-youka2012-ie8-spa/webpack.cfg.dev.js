const path = require("path");
const dir = path.join.bind(path, __dirname);

const webpack = require("webpack");
const HappyPack = require("happypack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const {proxyConfig,debugIE,devPort} = require("./my-dev-config");

const devConfig = {
    // devtool: "cheap-eval-source-map",
    devtool: debugIE?"cheap-inline-source-map":"cheap-module-eval-source-map",
    watchOptions: {
        ignored: /node_modules|dist|build/,
        aggregateTimeout: 3000, //监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
        poll: 200 //通过不停的询问文件是否改变来判断文件是否发生变化，默认每1000次
    },
    // devtool: "cheap-module-eval-source-map",
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和webpack-dev-server --hot不兼容。只能妥协*/
        filename: "assets/js/[name].[hash:5].js",
    },
    module: {
        loaders: [
            {
                test: /_\.css$/i,
                loader: "happypack/loader?cacheDirectory=true&id=cssm",
            },
            {
                test: /[^_]\.css$/i,
                loader: "happypack/loader?cacheDirectory=true&id=css",
            },
            {
                test: /\.less$/i,
                loader: "happypack/loader?cacheDirectory=true&id=less",
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {"NODE_ENV": JSON.stringify("development")},
            // jQuery: "jquery",
            // $: "jquery"
        }),
        new HappyPack({
            id: "cssm",
            threads: 4,
            loaders: [
                "style-loader",
                "css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]",
            ],
        }),
        new HappyPack({
            id: "css",
            threads: 4,
            loaders: ["style-loader", "css-loader", "postcss-loader"],
        }),
        new HappyPack({
            id: "less",
            threads: 4,
            loaders: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        }),
        new FriendlyErrorsPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        contentBase: dir("dist"),
        historyApiFallback: true,
        // compress: true,
        // hotOnly: true,
        inline: !debugIE, // ie11以下不支持inline
        noInfo: true,
        https: false,
        quiet: false,
        open: !debugIE,
        hot: !debugIE,
        clientLogLevel: "error",
        publicPath: "/",
        host: "127.0.0.1",
        port: devPort?devPort:8888,
        proxy: proxyConfig ? proxyConfig : {
            "/api/*": {
                target: "http://localhost:8989",
                secure: false,
                changeOrigin: false,
            },
            "/druid": {
                target: "http://localhost:8989",
                secure: false,
                changeOrigin: false,
            },
        },
    },
};

module.exports = devConfig;