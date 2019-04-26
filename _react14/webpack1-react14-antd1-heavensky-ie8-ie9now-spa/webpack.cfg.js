const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const lessLoader = new ExtractTextPlugin(
	"css/[name].[contenthash:5].css",
	{ allChunks: true }
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
				loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader"),
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
		new CleanWebpackPlugin(["dist"]),
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.HashedModuleIdsPlugin(),

        new UglifyJSPlugin({
        	sourceMap: false,
        	uglifyOptions: { ie8: true },
        }),

        // new UglifyJSPlugin({
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
        //         // ie8: false,
        //         ie8: true,
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

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         properties: false,
        //         warnings: false,
        //         screw_ie8: false
        //     },
        //     output: {
        //         comments: false,
        //         beautify: false,
        //         quote_keys: true,
        //         screw_ie8: false
        //     },
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     sourceMap: true
        // }),

		new ExtractTextPlugin(
			"css/[name].[contenthash:5].css",
			{ allChunks: true }
		),
		lessLoader,
	],
};

module.exports = publicConfig;
