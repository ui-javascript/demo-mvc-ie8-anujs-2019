const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

module.exports = {
  entry: './public/js/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js/dist')
  },
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'false',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    })
  ],
  module: {
    rules: [
      {
        test: /\.(html|css|txt)$/,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};