const shell = require('shelljs');
const path = require('path');
const del = require('del');

// let arr = del.sync([path.join(__dirname + '/../dist/static/js/**')]);
// console.log('正在删除目录');

shell.exec('node ./build/server.js --env=dev', { async: true }, (code, stdout, stderr) => {});
shell.exec('webpack --config ./build/webpack.conf.dev.anu --watch', { async: true }, (code, stdout, stderr) => {});
