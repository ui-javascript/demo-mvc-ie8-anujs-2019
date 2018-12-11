const path = require('path');

module.exports = {
  appRoot: path.resolve(__dirname, '../'),
  appSrc: path.resolve(__dirname, '../src'),
  appBuild: path.resolve(__dirname, '../build'),
  appDev: path.resolve(__dirname, '../dev'),
  appCommunal: path.resolve(__dirname, '../src/components/communal'),
  appStatic: path.resolve(__dirname, '../src/static'),
  appTool: path.resolve(__dirname, '../src/tool'),
};
