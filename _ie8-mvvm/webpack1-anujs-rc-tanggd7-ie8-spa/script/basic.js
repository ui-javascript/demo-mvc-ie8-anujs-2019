const autoprefixer = require('autoprefixer');
const eslintFomatter = require('./config/eslintFomatter');
const paths = require('./paths');

const basicConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.less', '.json'],
    alias: {
      static: paths.appStatic,
      ui: paths.appCommunal,
      tool: paths.appTool,
    },
    modules: ['node_modules', paths.appSrc],
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    postLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'es3ify-loader',
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        query: {
          formatter: eslintFomatter,
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 5120,
          name: 'img/[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        query: {
          name: 'file/[hash:8].[ext]',
        },
      },
    ],
  },
  postcss: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'safari >= 7', 'ie >= 8'],
    }),
  ],
};

module.exports = basicConfig;
