/**
 * 用JS文件的好处是可以通过设置环境变量来输出不同平台执行的文件
 */

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({browsers: [ "last 2 versions", "ios >= 8" , "android >= 4.0"]})
  ]
};

// module.exports = {
//   parser: 'sugarss',
//   plugins: {
//     'postcss-import': {},
//     'postcss-cssnext': {},
//     'cssnano': {}
//   }
// };

// module.exports = ({ file, options, env }) => ({
//   parser: file.extname === '.sss' ? 'sugarss' : false,
//   plugins: {
//     'postcss-import': { root: file.dirname },
//     'postcss-cssnext': options.cssnext ? options.cssnext : false,
//     'autoprefixer': env == 'production' ? options.autoprefixer : false,
//     'cssnano': env === 'production' ? options.cssnano : false
//   }
// });

// recommended
// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           { loader: 'css-loader', options: { importLoaders: 1 } },
//           'postcss-loader'
//         ]
//       }
//     ]
//   }
// }
